import React, {useContext, useState} from 'react';
import fakeData from './fakeData';
import fakeUserData from './fakeUserData';


const UserAndPriceTableContext = React.createContext();

function UserAndPriceTableProvider({children}) {
    const [userData, setUserData] = useState(fakeUserData);
    const [coins, setCoins] = useState(fakeData);
    const [displayedCoins, setDisplayedCoins] = useState(coins);

    return (
        <UserAndPriceTableContext.Provider value={{userData, setUserData, coins, setCoins, displayedCoins, setDisplayedCoins}}>
            {children}
        </UserAndPriceTableContext.Provider>
    );
}

const useUserAndPriceTable = () => useContext(UserAndPriceTableContext);

export {UserAndPriceTableProvider, useUserAndPriceTable};