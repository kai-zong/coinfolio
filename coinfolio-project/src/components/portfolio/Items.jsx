

function Items( {portfolioByCoin, index}) {
  const marketPriceAmount = portfolioByCoin.amount * portfolioByCoin.coinDetails.marketPrice;
  const profitPercentage = ((marketPriceAmount - portfolioByCoin.amountInUSD) / portfolioByCoin.amountInUSD) * 100;
  return (
    <tr className="divide-solid"  >
        <td className="border-t border-b border-gray-700 px-4 py-2">{index}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2 flex items-center">
            <img src={portfolioByCoin.coinDetails.image} alt={portfolioByCoin.coinDetails.name} className="h-8 w-8" />
        </td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.coinDetails.symbol}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.coinDetails.name}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.amount.toFixed(2)}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">${portfolioByCoin.amountInUSD.toFixed(2)}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">${marketPriceAmount.toFixed(2)} </td>
        <td className="border-t border-b border-gray-700 px-4 py-2"> {profitPercentage.toFixed(2)}%</td>
    </tr>
  );
}

export default Items;