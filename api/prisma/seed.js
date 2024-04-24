import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Seed the database with the top 50 coins from CoinMarketCap
async function main() {
    // Construct the URL and query parameters for the first request
    const url = new URL('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');
    const params = { start: '1', limit: '50', convert: 'USD' };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // First API call to get the top 50 coins
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const coins = responseData.data;
    const timestamp = responseData.status.timestamp;
    const date = new Date(timestamp);

    // Construct the URL for the second request to get detailed info
    const coinIds = coins.map(coin => coin.id).join(',');
    const detailsUrl = new URL(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info`);
    detailsUrl.searchParams.append('id', coinIds);

    const detailsResponse = await fetch(detailsUrl, {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!detailsResponse.ok) {
        throw new Error(`HTTP error! status: ${detailsResponse.status}`);
    }

    const detailsData = await detailsResponse.json();
    const coinDetails = detailsData.data;

    // Updating the database
    for (const coin of coins) {
        const details = coinDetails[coin.id];
        await prisma.coin.create({
            data: {
                id: coin.id,
                symbol: coin.symbol,
                name: coin.name,
                image: details?.logo, // Using optional chaining to ensure no errors if details is missing
                marketPrice: coin.quote.USD.price,
                marketPriceAt: date
            },
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
