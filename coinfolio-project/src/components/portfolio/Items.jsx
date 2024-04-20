

function Items( {portfolioByCoin, index}) {
    
  return (
    <tr className="divide-solid"  >
        <td className="border-t border-b border-gray-700 px-4 py-2">{index}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.coinDetails.symbol}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.coinDetails.name}</td>
        <td className="border-t border-b border-gray-700 px-4 py-2">${portfolioByCoin.coinDetails.symbol}</td>
    </tr>
  );
}

export default Items;