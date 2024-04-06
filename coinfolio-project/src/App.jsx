import { useState } from 'react';
import './App.css';
import fakeData from './fakeData';
import Ticker from './components/Ticker';
import Nav from './components/Nav';
import PriceTable from './components/PriceTable';

console.log(fakeData[0])

function App() {
  const [coins, setCoins] = useState(fakeData)

  return (
    <>
      <Nav />

      {/* here shows the content all visitor can see, price tickers */}
      <PriceTable coins={coins} />
    </>
  )
}

export default App
