import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client'
import axios from "axios";
const prisma = new PrismaClient();

// Seed the database with the top 50 coins from CoinMarketCap
async function main() {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        params: {
            start: 1,
            limit: 50,
            convert: 'USD'
        },
        headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
        }
    });
  const coins = response.data.data;

  for (const coin of coins) {
    await prisma.coin.create({
      data: {
        symbol: coin.symbol,
        name: coin.name,
        cmcId: coin.id,
      },
    });
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
