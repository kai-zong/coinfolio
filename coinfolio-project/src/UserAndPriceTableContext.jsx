import React, { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import config from './config';

const UserAndPriceTableContext = React.createContext();
const requestedScopes = ["profile", "email"];

const GET_USER_PROFILE_URL = 'http://localhost:3001/profile';

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
              audience: config.REACT_APP_AUTH0_AUDIENCE,
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
      if (accessToken) {
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
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [accessToken]);

  const updateNickName = async (nickName) => {
    try {
      const response = await fetch(`${GET_USER_PROFILE_URL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ nickName })
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedData = await response.json();
      setUserData(prev => ({ ...prev, ...updatedData }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    setUpdateTime(displayedCoins[0]?.marketPriceAt);
  }, [displayedCoins]); // when displayedCoins changes, update the time

  // 将 fetchCoins 定义为一个可重用的函数
  const fetchCoins = async () => {
    try {
      const response = await axios.get('http://localhost:3001/coins');
      // console.log('Coins fetched:', response.data);
      setCoins(response.data);
      setDisplayedCoins(response.data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  };

  const updateCoins = async () => {
    try {
      await axios.post('http://localhost:3001/update-coins');
      fetchCoins(); // 成功更新后重新获取数据
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