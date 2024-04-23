import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAndPriceTable } from "../UserAndPriceTableContext";
import {useAuth0} from '@auth0/auth0-react';

function Nav() {
  const isSmallIcon = useMediaQuery({ query: "(max-width: 700px)" });
  const [signingButtonText, setSigningButtonText] = useState("Sign In");
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setSigningButtonText("Log Out");
    } else {
      setSigningButtonText("Log In");
    }
  }, [isAuthenticated]);

  
  function navigateBasedOnLogging(isAuthenticated) {
    if (isAuthenticated) {
      navigate("/portfolio");
    } else {
      loginWithRedirect();
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
        <div className="buttons pr-1">
          <button
            className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md"
            onClick={() => navigateBasedOnLogging(isAuthenticated)}
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
