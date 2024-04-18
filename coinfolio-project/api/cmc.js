import express from "express";
import morgan from "morgan";
import cors from "cors";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();


// express init
const app = express();

// express configurations
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// port
const PORT = process.env.PORT || 3001;

// API endpoints
// call third-party API (coinmarketcap) to get the latest price of the top n cryptocurrencies
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