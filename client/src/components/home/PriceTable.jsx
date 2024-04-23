import React, { useEffect } from 'react';
import Ticker from './Ticker';
import { useState } from 'react';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';
import { useAuth0 } from '@auth0/auth0-react';


function PriceTable() {
    const { displayedCoins, userData } = useUserAndPriceTable();
    const { isAuthenticated, user } = useAuth0();
    const [localNickName, setLocalNickName] = useState('');  // Local editing state

    useEffect(() => {
        if (!isAuthenticated) return;  // Don't fetch if no access token
        setLocalNickName(userData.nickName);  // Initialize with context data
    }, [userData.nickName]);  // Dependency on userData.nickName to update local state when context changes


    return (
        <div className='w-full px-5 m-3 '>

            {isAuthenticated ? <div className='bg-gray-800 rounded-2xl'>
                <h1 className="text-4xl font-bold text-center mb-8 pt-3">
                    Welcome, {userData.nickName || user.name}!
                </h1>
                <p className="text-lg text-center mb-4 pb-3">
                    Start tracking your portfolio of Top 50 Crypto Assets
                </p>

            </div> : <div className='bg-gray-800 rounded-2xl'>
                <h1 className="text-4xl font-bold text-center mb-8 pt-3">
                    Welcome to Coinfolio!
                </h1>
                <p className="text-lg text-center mb-4 pb-3">
                    Login to start tracking your portfolio of Top 50 Crypto Assets
                </p>

            </div>}

            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Logo</th>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">TimeStamp</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCoins.map((coin, index) => (
                        <Ticker key={index} index={index + 1} coin={coin} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PriceTable;