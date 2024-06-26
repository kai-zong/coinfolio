import Items from './Items';
import React, { useEffect, useState } from 'react';

function PortfolioTable({ portfolio, isMobile }) {

	// Sort the portfolio by marketPriceAmount descending
	const sortedPortfolio = portfolio.sort((a, b) => {
		const marketPriceAmountA = a.amount * a.coinDetails.marketPrice;
		const marketPriceAmountB = b.amount * b.coinDetails.marketPrice;
		return marketPriceAmountB - marketPriceAmountA; // For descending order
	});

	return (
		<div className='w-full p-3'>
			<table className="table-auto w-full text-left">
				<thead>
					<tr>
						<th className="px-4 py-2">#</th>
						<th className="px-4 py-2">Icon</th>
						<th className="px-4 py-2">Symbol</th>
						<th className="px-4 py-2">Amount</th>
						<th className="px-4 py-2">Cost</th>
						<th className="px-4 py-2">Market</th>
						{!isMobile && <th className="px-4 py-2">MarketTotal</th>}
						{!isMobile && <th className="px-4 py-2">Profit</th>}
					</tr>
				</thead>
				<tbody>
					{sortedPortfolio.map((portfolioByCoin, index) => (
						<Items key={portfolioByCoin.coinId} index={index + 1} portfolioByCoin={portfolioByCoin} isMobile={isMobile} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PortfolioTable;