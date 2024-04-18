import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from '@prisma/client'
import morgan from "morgan";
import cors from "cors";
import axios from "axios";
import { auth } from "express-oauth2-jwt-bearer";

// port
const PORT = process.env.PORT || 3001;

// this is a middleware that will validate the access token sent by the client
// const requireAuth = auth({
//   audience: process.env.AUTH0_AUDIENCE,
//   issuerBaseURL: process.env.AUTH0_ISSUER,
//   tokenSigningAlg: "RS256",
// });

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

app.get("/:id", async (req, res) => {
    // const auto0Id = req.auth.payload.sub;
    const id = req.params.id;

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    res.json(user);
});

// app.post("/verify-user", requireAuth, async (req, res) => {
//     const auth0Id = req.auth.payload.sub;
//     const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
//     const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
  
//     const user = await prisma.user.findUnique({
//       where: {
//         auth0Id,
//       },
//     });
  
//     if (user) {
//       res.json(user);
//     } else {
//       const newUser = await prisma.user.create({
//         data: {
//           email,
//           auth0Id,
//           name,
//         },
//       });
  
//       res.json(newUser);
//     }
//   });

  // API endpoints
  // create a new portfolio
  app.post("/portfolio", async (req, res) => {
    const { name, userId } = req.body;

    const portfolio = await prisma.portfolio.create({
      data: {
        portfolioName: name,
        userId,
      },
    });

    res.json(portfolio);
  });


  // create a new transaction
  app.post("/transaction", async (req, res) => {
    const { portfolioId,coinSymbol, coinName, coinId, coinImage, coinPriceCost, transferIn, amount } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        portfolioId,
        coinSymbol,
        coinName,
        coinId,
        coinImage,
        coinPriceCost,
        transferIn,
        amount: transferIn ? amount : -amount,
        amountInUSD: transferIn ? amount * coinPriceCost : -amount * coinPriceCost,
      },
    });

    res.json(transaction);
  });

  // 3rd-party API (coinmarketcap) to get the latest price of the top n cryptocurrencies
  app.get("/cryptos/:limit", async (req, res) => {
    const limit = req.params.limit;
    console.log("Using API Key:", process.env.CMC_API_KEY);

    try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            params: {
                start: 1,
                limit: 5,
                convert: 'USD'
            },
            headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('API call error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve data from CoinMarketCap' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });