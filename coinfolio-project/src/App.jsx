import { useState } from 'react';
import './App.css';
import fakeData from './fakeData';
import Ticker from './components/Ticker';
import Nav from './components/Nav';

console.log(fakeData[0])

function App() {
  const [coins, setCoins] = useState(fakeData)

  return (
    <>
      <Nav />

      {/* here shows the content all visitor can see, price tickers */}
      <div className='w-full'>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">1h %</th>
            <th className="px-4 py-2">1d %</th>
            <th className="px-4 py-2">7d %</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <Ticker key={index} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App
