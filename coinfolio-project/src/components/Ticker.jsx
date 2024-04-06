

function Ticker({ coin, index}) {
  return (
    <div className='flex justify-evenly m-5 border-2 p-5'>
      <img src={coin.image} alt={coin.name} />
      <h2>{coin.name}</h2>
      <h3>{coin.symbol}</h3>
      <h3>${coin.quote.USD.price.toFixed(2)}</h3>
      <h3>{coin.quote.USD.percent_change_24h.toFixed(2)}%</h3>
    </div>
  );
}

export default Ticker;