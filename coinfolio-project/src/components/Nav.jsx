import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAndPriceTable } from "../UserAndPriceTableContext";
import {useAuth0} from '@auth0/auth0-react';

function Nav() {
  const isSmallIcon = useMediaQuery({ query: "(max-width: 700px)" });
  const isSmallSearch = useMediaQuery({ query: "(max-width: 600px)" });
  const [signingButtonText, setSigningButtonText] = useState("Sign In");
  const {coins, setDisplayedCoins} = useUserAndPriceTable();
  const [inputValue, setInputValue] = useState("");
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
  let isLoggedIn = true;
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setSigningButtonText("Log Out");
    } else {
      setSigningButtonText("Log In");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setInputValue(""), setDisplayedCoins(coins); 
  }, [location]);

  
  function navigateBasedOnLogging(isLoggedIn) {
    if (isLoggedIn) {
      navigate("/portfolio");
    } else {
      navigate("/verify-user");
    }
  }

  

  return (
    <nav className="flex items-center justify-between w-full border-b border-gray-700">
      <div className="flex items-center justify-start pl-3">
        <img
          className="h-10 w-auto"
          src="/src/assets/logo/png/Small-logo-color.png"
          alt="Small Logo"
        />
        {!isSmallIcon && (
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold pl-3 bg-transparent border-none cursor-pointer focus:outline-none hover:text-shadow"
            style={{ transition: "text-shadow 0.3s" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.textShadow = "2px 2px 8px rgba(0,0,0,0.5)")
            }
            onMouseOut={(e) => (e.currentTarget.style.textShadow = "none")}
          >
            Coinfolio
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isSmallSearch && (
          <div className="search-bar">
            <input
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange = {(e)=>{
                setInputValue(e.target.value);
                let filteredCoins = coins.filter((coin)=>{
                  return coin.name.toLowerCase().includes(inputValue.toLowerCase());
                });
                setDisplayedCoins(filteredCoins);
              }}
            />
          </div>
        )}
        <div className="buttons pr-1">
          <button
            className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md"
            onClick={() => navigateBasedOnLogging(isLoggedIn)}
          >
            Portfolio
          </button>
          {isAuthenticated? <button className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md" onClick={()=>{logout({returnTo: window.location.origin});}
          }>
            Log Out
          </button> :
          <button className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md" onClick={loginWithRedirect}>
          Log In
        </button>}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
