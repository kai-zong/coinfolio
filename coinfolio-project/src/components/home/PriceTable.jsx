import React from 'react';
import Ticker from './Ticker';
import { useState } from 'react';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';


function PriceTable() {
    const { displayedCoins, } = useUserAndPriceTable();

    console.log('displayedCoins:', displayedCoins);

    return (
        <div className='w-full px-5 m-3 '>

            <div className='bg-gray-800 rounded-2xl'>
                <h1 className="text-4xl font-bold text-center mb-8 pt-3">
                    Welcome to Coinfolio!
                </h1>
                <p className="text-lg text-center mb-4 pb-3">
                    Login to start tracking your portfolio of Top 50 Crypto Assets
                </p>

            </div>

            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Logo</th>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">TimeStamp</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCoins.map((coin, index) => (
                        <Ticker index={index + 1} coin={coin} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PriceTable;