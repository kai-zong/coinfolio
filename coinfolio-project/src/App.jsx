import { useState } from 'react';
import './App.css';
import fakeData from './fakeData';
import Ticker from './components/Ticker';
import {Link} from 'react-router-dom';

console.log(fakeData[0])

function App() {
  const [coins, setCoins] = useState(fakeData)

  return (
    <>
      <nav className="flex justify-evenly">
        <h1 className='text-center text-3xl font-bold m-5'>Coinfolio</h1>

        <ul className='flex items-center justify-evenly'>
          <li className='m-5'>Home</li>
          <li className='m-5'>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li className='m-5'>Transactions</li>
        </ul>
      </nav>

      {/* here shows the content all visitor can see, price tickers */}
      <div className='flex flex-col justify-evenly'>
        {coins.map((coin, index) => (
          <Ticker key={index} coin={coin} />
        ))}
      </div>
    </>
  )
}

export default App
