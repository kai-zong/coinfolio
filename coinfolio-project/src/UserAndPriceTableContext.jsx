import React, {useContext, useState} from 'react';
import fakeData from './fakeData';
import fakeUserData from './fakeUserData';
import {useAuth0} from '@auth0/auth0-react';
import {useEffect} from 'react';

const UserAndPriceTableContext = React.createContext();
const requestedScopes = ["profile", "email"];

function UserAndPriceTableProvider({children}) {
    const [userData, setUserData] = useState(fakeUserData);
    const [coins, setCoins] = useState(fakeData);
    const [displayedCoins, setDisplayedCoins] = useState(coins);
    const {getAccessTokenSilently, isAuthenticated} = useAuth0();
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        const getAccessToken = async () => {
          try {
            // get access token silently from Auth0, which will be stored in the context
            const token = await getAccessTokenSilently({
              authorizationParams: {
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: requestedScopes.join(" "),
              },
            });
            setAccessToken(token);
          } catch (err) {
            console.log(err);
          }
        };
    
        if (isAuthenticated) {
          getAccessToken();
        }
      }, [getAccessTokenSilently, isAuthenticated]);

    return (
        <UserAndPriceTableContext.Provider value={{userData, setUserData, coins, setCoins, displayedCoins, setDisplayedCoins, accessToken}}>
            {children}
        </UserAndPriceTableContext.Provider>
    );
}

const useUserAndPriceTable = () => useContext(UserAndPriceTableContext);

export {UserAndPriceTableProvider, useUserAndPriceTable};