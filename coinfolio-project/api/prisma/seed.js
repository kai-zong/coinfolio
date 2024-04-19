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

    // use the coin ids to get more details
    const coinIds = coins.map(coin => coin.id).join(',');
    const detailsResponse = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${coinIds}`, {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
        }
    });
    const coinDetails = detailsResponse.data.data;

    // 更新数据库
    for (const coin of coins) {
        const details = coinDetails[coin.id];
        await prisma.coin.create({
            data: {
                id: coin.id,
                symbol: coin.symbol,
                name: coin.name,
                image: details?.logo // 使用可选链确保当details没有值时不会出错
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
