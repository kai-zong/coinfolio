import Items from './Items';
import React, { useEffect, useState } from 'react';

function PortfolioTable( { portfolio }) {

    return (
        <div className='w-full p-3'>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Cost</th>
              <th className="px-4 py-2">MarketPrice</th>
              <th className="px-4 py-2">Profit %</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((portfolioByCoin, index) => (
              <Items index={index+1} portfolioByCoin={portfolioByCoin} /> 
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default PortfolioTable;