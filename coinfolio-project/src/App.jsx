import { useState } from 'react';
import './App.css';
import fakeData from './fakeData';


function App() {
  const [count, setCount] = useState(0)

  console.log(fakeData[0])

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
