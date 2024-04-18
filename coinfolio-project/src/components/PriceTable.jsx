import React from 'react';
import Ticker from './Ticker';
import { useState } from 'react';
import { useUserAndPriceTable } from '../UserAndPriceTableContext';


function PriceTable() {
    const {displayedCoins, updateTime} = useUserAndPriceTable();

    const formattedUpdateTime = updateTime ? updateTime.toLocaleString() : '';

    return (
        <div className='w-full p-3'>
            <div>
            <p>As of {formattedUpdateTime} </p>
            </div>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">1h %</th>
                        <th className="px-4 py-2">1d %</th>
                        <th className="px-4 py-2">7d %</th>
                        <th className="px-4 py-2">Dominance %</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCoins.map((coin, index) => (
                        <Ticker index={index+1} coin={coin} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PriceTable;