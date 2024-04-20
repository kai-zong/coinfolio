

function Ticker({ coin, index }) {
  const formattedDate = new Date(coin.marketPriceAt).toLocaleDateString();
  const formattedTime = new Date(coin.marketPriceAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

  return (
    <tr className="divide-solid">
      <td className="border-t border-b border-gray-700 px-4 py-2">{index}</td>
      <td className="border-t border-b border-gray-700 px-4 py-2 flex items-center"> {/* Added 'items-center' class */}
        <img src={coin.image} alt={coin.name} className="h-8 w-8" />
      </td>
      <td className="border-t border-b border-gray-700 px-4 py-2">{coin.symbol}</td>
      <td className="border-t border-b border-gray-700 px-4 py-2">{coin.name}</td>
      <td className="border-t border-b border-gray-700 px-4 py-2">${coin.marketPrice.toFixed(2)}</td>
      <td className="border-t border-b border-gray-700 px-4 py-2">{formattedDate}  - {formattedTime}</td> 
    </tr>
  );
}

export default Ticker;