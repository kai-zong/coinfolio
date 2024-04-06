import React, { useState } from 'react';
import fakeData from '../fakeData';
import Ticker from './Ticker'; // Adjust the path as necessary

function Asset() {
    const [coins, setCoins] = useState(fakeData.slice(2, 5));

    return (
        <ul className='flex-column justify-evenly m-5 border-2 p-5'>
            {coins.map((coin, index) => (
                <Ticker key={index} coin={coin} />
            ))}
        </ul>
    );
}

export default Asset;