

function Items( {portfolioByCoin, index, isMobile }) {
  const marketPriceAmount = portfolioByCoin.amount * portfolioByCoin.coinDetails.marketPrice;
  const profitPercentage = ((marketPriceAmount - portfolioByCoin.amountInUSD) / portfolioByCoin.amountInUSD) * 100;
  const costPerPrice = portfolioByCoin.amountInUSD / portfolioByCoin.amount;
  return (
    <tr className="divide-solid"  >
        <td className="border-t border-b border-gray-700 px-4 py-2">{index}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2 flex items-center">
            <img src={portfolioByCoin.coinDetails.image} alt={portfolioByCoin.coinDetails.name} className="h-8 w-8" />
        </td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.coinDetails.symbol}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.amount.toFixed(2)}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">${costPerPrice.toFixed(2)}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">${portfolioByCoin.coinDetails.marketPrice.toFixed(2)}</td>
        {!isMobile && <td className="border-t border-b border-gray-700 px-4 py-2">${marketPriceAmount.toFixed(2)}</td>}
        {!isMobile && <td className="border-t border-b border-gray-700 px-4 py-2">{profitPercentage.toFixed(2)}%</td>}
    </tr>
  );
}

export default Items;