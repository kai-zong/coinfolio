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
      <div className='flex flex-col justify-evenly'>
        {coins.map((coin, index) => (
          <Ticker key={index} coin={coin} />
        ))}
      </div>
    </>
  )
}

export default App
