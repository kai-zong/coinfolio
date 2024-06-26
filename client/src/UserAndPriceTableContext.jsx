import React, { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserAndPriceTableContext = React.createContext();
const requestedScopes = ["profile", "email"];

const GET_USER_PROFILE_URL = `${import.meta.env.VITE_Backend_API_URL}/profile`;
const GET_COINS_URL = `${import.meta.env.VITE_Backend_API_URL}/coins`;
const UPDATE_COINS_URL = `${import.meta.env.VITE_Backend_API_URL}/update-coins`;

function UserAndPriceTableProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [coins, setCoins] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [updateTime, setUpdateTime] = useState(Date.now());
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  // get access token silently when user is authenticated
  useEffect(() => {
    const getAccessToken = async () => {
      if (isAuthenticated) {
        try {
          // get access token silently from Auth0, which will be stored in the context
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE,
              scope: requestedScopes.join(" "),
            },
          });
          setAccessToken(token);
        } catch (err) {
          console.log('Error getting access token:', err);
        }
      }
    };

    if (isAuthenticated) {   // only get access token if user is authenticated
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);


  // fetch user data when access token changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken || !isAuthenticated) { // Check if access token is available before trying to fetch
        console.error('Cannot fetch user data without access token');
        return;
      }
        try {
          const response = await fetch(`${GET_USER_PROFILE_URL}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          setUserData(data);
          console.log("User data fetched:", data);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
    };

    fetchUserData();
  }, [accessToken, isAuthenticated]);

  const updateNickName = async (newNickName) => {
    if (!accessToken) { // Check if access token is available before trying to update
      console.error('Cannot update nickname without access token');
      return;
    }

    try {
      const response = await fetch(`${GET_USER_PROFILE_URL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ nickName: newNickName })
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(prevUserData => ({ ...prevUserData, nickName: newNickName }));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    setUpdateTime(displayedCoins[0]?.marketPriceAt);
  }, [displayedCoins]); // when displayedCoins changes, update the time

  // fetch coins data
  const fetchCoins = async () => {
    try {
      const response = await fetch(GET_COINS_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setCoins(data);
      setDisplayedCoins(data);
      console.log('Coins fetched:', data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  };

  const updateCoins = async () => {
    try {
      const response = await fetch(UPDATE_COINS_URL, { method: 'POST' });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      fetchCoins(); // Re-fetch coins after a successful update
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  };

  useEffect(() => {
    fetchCoins();
    // updateCoins();
  }, []);

  console.log('accessToken:', accessToken)

  return (
    <UserAndPriceTableContext.Provider value={{
      userData, setUserData,
      coins, setCoins,
      displayedCoins, setDisplayedCoins,
      updateTime, setUpdateTime,
      updateNickName,
      updateCoins,
      fetchCoins,
      accessToken
    }}>
      {children}
    </UserAndPriceTableContext.Provider>
  );
}

const useUserAndPriceTable = () => useContext(UserAndPriceTableContext);

export { UserAndPriceTableProvider, useUserAndPriceTable };