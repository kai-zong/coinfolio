import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from '@prisma/client'
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// port
const PORT = parseInt(process.env.PORT) || 8080;

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();

// app.get("/:id/transactions", async (req, res) => {

//     const user = await prisma.user.findUnique({
//         where: {
//             auth0Id: auto0Id,
//         },
//     });

//     const transactions = await prisma.transaction.findMany({ where: { userId: user.id } });

// });

// app.get("/:id", async (req, res) => {
//     // const auto0Id = req.auth.payload.sub;
//     const id = req.params.id;

//     const user = await prisma.user.findUnique({
//         where: {
//             id: parseInt(id),
//         },
//     });

//     res.json(user);
// });


// PUBLIC ENDPOINTS
// ********************************************************************************************************************
// health check endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
}
);

// get all coins in the database, public endpoint
app.get("/coins", async (req, res) => {
  const coins = await prisma.coin.findMany();
  res.json(coins);
});

// helper function to update the market price of the coins
async function updateCoinData() {
  try {
    const url = new URL('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');
    url.searchParams.append('start', '1');
    url.searchParams.append('limit', '50');
    url.searchParams.append('convert', 'USD');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await response.json();
    const coins = jsonResponse.data;
    const currentTimestamp = new Date(jsonResponse.status.timestamp);

    await Promise.all(coins.map(async (coin) => {
      const { id, symbol, name, quote } = coin;
      const { price } = quote.USD;

      await prisma.coin.upsert({
        where: { id },
        update: {
          symbol,
          name,
          marketPrice: price,
          marketPriceAt: currentTimestamp
        },
        create: {
          id,
          symbol,
          name,
          marketPrice: price,
          marketPriceAt: currentTimestamp
        }
      });
    }));

    return "Coin data updated successfully.";
  } catch (error) {
    console.error("Failed to update coin data:", error);
    throw error;
  }
}

// Endpoint to trigger market price update, public endpoint
app.post('/update-coins', async (req, res) => {
  try {
    const result = await updateCoinData();
    res.send(result);
  } catch (error) {
    res.status(500).send(`Error updating coin data: ${error.message}`);
  }
});

// // 3rd-party API (coinmarketcap) to get the latest price of the top n cryptocurrencies
// app.get("/cryptos/:limit", async (req, res) => {
//   const limit = req.params.limit;
//   console.log("Using API Key:", process.env.CMC_API_KEY);

//   try {
//     const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
//       params: {
//         start: 1,
//         limit: 5,
//         convert: 'USD'
//       },
//       headers: {
//         'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('API call error:', error.message);
//     res.status(500).json({ error: 'Failed to retrieve data from CoinMarketCap' });
//   }
// });


// PROTECTED ENDPOINTS
// ********************************************************************************************************************
// verify user
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
  console.log('payload:', req.auth.payload);
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
        nickName: name,
      },
    });

    res.json(newUser);
  }
});


// get all transactions of a user, requires authentication
app.get('/transactions', requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id, // id is a string, so we need to convert it to a number
      },
      include: {
        transactions: {
          include: {
            coin: true, // get the coin details of the transaction
          },
        }
      },
    });

    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

// create a new transaction for user, requires authentication
app.post("/transaction", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    const { coinId, coinPriceCost, transferIn, amount } = req.body;

    // Explicitly parse integers and floats to ensure correct types
    const parsedCoinId = parseInt(coinId, 10);
    const parsedCoinPriceCost = parseFloat(coinPriceCost);
    const parsedAmount = parseFloat(amount);

    // Check for missing fields and NaN values from incorrect parsing
    if (isNaN(parsedCoinId) || isNaN(parsedCoinPriceCost) || transferIn === undefined || isNaN(parsedAmount)) {
      return res.status(400).json({
        error: "Missing required fields or invalid data types", details: {
          isCoinIdInvalid: isNaN(parsedCoinId),
          isCoinPriceCostInvalid: isNaN(parsedCoinPriceCost),
          isAmountInvalid: isNaN(parsedAmount),
          isTransferInUndefined: transferIn === undefined
        }
      });
    }

    // amount must be positive
    if (parsedAmount <= 0) {
      return res.status(400).json({ error: "Amount must be positive" });
    }

    // Retrieve the user based on auth0Id
    const user = await prisma.user.findUnique({
      where: { auth0Id }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        coinId: parsedCoinId,
        coinPriceCost: parsedCoinPriceCost,
        transferIn,
        amount: transferIn ? parsedAmount : -parsedAmount,
        amountInUSD: transferIn ? parsedAmount * parsedCoinPriceCost : -parsedAmount * parsedCoinPriceCost,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Failed to create transaction:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// delete a transaction, requires authentication
app.delete("/transaction/:transId", requireAuth, async (req, res) => {
  const { transId } = req.params;

  const auth0Id = req.auth.payload.sub;

  // Retrieve the user based on auth0Id
  const user = await prisma.user.findUnique({
    where: { auth0Id }
  });

  // Verify if the transaction belongs to the user
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: parseInt(transId),
    },
  });

  if (transaction.userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const transactionDelete = await prisma.transaction.delete({
    where: {
      id: parseInt(transId),
    },
  });

  res.json(transactionDelete);
});

// modify a transaction, requires authentication
app.put("/transaction/:transId", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { transId } = req.params;
  const { coinPriceCost, transferIn, amount } = req.body;

  const parsedAmount = parseFloat(amount);
  const parsedCoinPriceCost = parseFloat(coinPriceCost);

  // Retrieve the user based on auth0Id
  const user = await prisma.user.findUnique({
    where: { auth0Id }
  });

  // Verify if the transaction belongs to the user
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: parseInt(transId),
    },
  });

  if (transaction.userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // check for missing fields
  if (!coinPriceCost || transferIn === undefined || !parsedAmount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // amount must be positive
  if (parsedAmount <= 0) {
    return res.status(400).json({ error: "Amount must be positive" });
  }



  // Update the transaction
  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: parseInt(transId),
    },
    data: {
      coinPriceCost: parsedCoinPriceCost,
      transferIn,
      amount: transferIn ? parsedAmount : -parsedAmount,
      amountInUSD: transferIn ? parsedAmount * parsedCoinPriceCost : -parsedAmount * parsedCoinPriceCost,
    },
  });

  res.json(updatedTransaction);
});


// get portfolio details of a user
app.get('/portfolio', requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  try {

    // Retrieve the user based on auth0Id
    const user = await prisma.user.findUnique({
      where: { auth0Id }
    });

    const portfolio = await prisma.transaction.groupBy({
      by: ['coinId'],
      where: {
        userId: user.id,
      },
      _sum: {
        amount: true,
        amountInUSD: true,
      },
      _avg: {
        coinPriceCost: true,
      },
    });

    const detailedPortfolio = await Promise.all(portfolio.map(async (item) => {
      const coin = await prisma.coin.findUnique({
        where: {
          id: item.coinId,
        },
      });

      return {
        coinId: item.coinId,
        amount: item._sum.amount,
        amountInUSD: item._sum.amountInUSD,
        averageCost: item._avg.coinPriceCost,
        currentPrice: coin.marketPrice, // Assuming marketPrice is the current price stored in the database
        coinDetails: coin,
      };
    }));

    res.json(detailedPortfolio);
  } catch (error) {
    console.error('Failed to get portfolio:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

// get user profile
app.get('/profile', requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  try {

    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
});

// PUT endpoint to update user name
app.put('/profile', requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;

  const { nickName } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        nickName: nickName
      }
    });
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});