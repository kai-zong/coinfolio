import Items from './Items';
import React, { useEffect, useState } from 'react';

function PortfolioTable() {
    // request API to get the transaction details of a user
    const [portfolio, setPortfolio] = useState([]);
    const userId = 1; // Replace with the actual user ID

    useEffect(() => {
        fetch(`http://localhost:3001/portfolio/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPortfolio(data);
                console.log('Portfolio data:', data); // Log the retrieved data
            })
            .catch(error => {
                console.error('Failed to fetch transactions:', error);
            });
    }, [userId]); // Add an empty array as the second argument to the useEffect hook

    return (
        <div className='w-full p-3'>
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
            {portfolio.map((portfolioByCoin, index) => (
              <Items index={index+1} portfolioByCoin={portfolioByCoin} /> 
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default PortfolioTable;