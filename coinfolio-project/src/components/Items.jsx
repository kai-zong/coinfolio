

function Items( {portfolioByCoin}) {
  return (
    <tr className="divide-solid">
        
        <td className="border-t border-b border-gray-700 px-4 py-2">{portfolioByCoin.coinDetails.symbol}</td>
        
    </tr>
  );
}

export default Items;