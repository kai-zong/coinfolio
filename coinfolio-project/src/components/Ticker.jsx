

function Ticker({ coin, index }) {
  return (
    <tr className="divide-solid">
      <td className="border-t border-b border-gray-600 px-4 py-2">{coin.name}</td>
      <td className="border-t border-b border-gray-600 px-4 py-2">{coin.symbol}</td>
      <td className="border-t border-b border-gray-600 px-4 py-2">${coin.quote.USD.price.toFixed(2)}</td>
      <td className="border-t border-b border-gray-600 px-4 py-2">{coin.change1h}</td>
      <td className="border-t border-b border-gray-600 px-4 py-2">{coin.quote.USD.percent_change_24h.toFixed(2)}%</td>
      <td className="border-t border-b border-gray-600 px-4 py-2">{coin.change7d}</td>
    </tr>
  );
}

export default Ticker;