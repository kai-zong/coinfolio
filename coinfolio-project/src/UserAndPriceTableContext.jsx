import React, { useContext, useState } from 'react';
import fakeUserData from './fakeUserData';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';

const UserAndPriceTableContext = React.createContext();
const requestedScopes = ["profile", "email"];

function UserAndPriceTableProvider({ children }) {
  const [userData, setUserData] = useState(fakeUserData);
  const [coins, setCoins] = useState([]);
  const [updateTime, setUpdateTime] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
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

  useEffect(() => {
    // Fetch user data here if needed or use the accessToken
    const fetchCoins = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cryptos/50');
        setCoins(response.data.data);
        setDisplayedCoins(response.data.data); // Or apply some filter logic here

        // Convert the timestamp to a Date object
        const timestamp = response.data.status.timestamp;
        const date = new Date(timestamp);
        setUpdateTime(date); // Save the Date object

        // console.log('Timestamp:', timestamp);
        // console.log('Date object:', date);
        // console.log('Coins fetched:', response.data.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <UserAndPriceTableContext.Provider value={{
      userData, setUserData,
      coins, setCoins,
      displayedCoins, setDisplayedCoins,
      updateTime, setUpdateTime,
      accessToken
    }}>
      {children}
    </UserAndPriceTableContext.Provider>
  );
}

const useUserAndPriceTable = () => useContext(UserAndPriceTableContext);

export { UserAndPriceTableProvider, useUserAndPriceTable };