import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';
import config from './config';

const UserAndPriceTableContext = React.createContext();
const requestedScopes = ["profile", "email"];

function UserAndPriceTableProvider({ children }) {
  const [userData, setUserData] = useState();
  const [nickName, setNickName] = useState(''); // 新增：用户名
  const [coins, setCoins] = useState([]);
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [updateTime, setUpdateTime] = useState(Date.now());
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const getAccessToken = async () => {
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
        console.log(err);
      }
    };

    if (isAuthenticated) {   // only get access token if user is authenticated
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.status === 200) {
          setUserData(response.data);
          setNickName(response.data.nickName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const updateNickName = async (newNickName) => {
    try {
      const response = await axios.put(`${config.API_URL}/profile`, { nickName: newNickName }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (response.status === 200) {
        setNickName(newNickName);  // 更新本地状态
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
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
      nickName, setNickName,
      updateNickName,
      coins, setCoins,
      displayedCoins, setDisplayedCoins,
      updateTime, setUpdateTime,
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