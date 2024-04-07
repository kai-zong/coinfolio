import React, {useState, useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';


function Nav() {
    const isSmallIcon = useMediaQuery({ query: '(max-width: 700px)' });
    const isSmallSearch = useMediaQuery({ query: '(max-width: 600px)' });
    const [signingButtonText, setSigningButtonText] = useState("Sign In");
    let isLoggedIn = true;

    useEffect (() => {
        if (isLoggedIn){
            setSigningButtonText("Sign Out");
        }
        else{
            setSigningButtonText("Sign In");
        }
    }, [isLoggedIn]);

    let navigate = useNavigate();
    function navigateBasedOnLogging(isLoggedIn) {
        if (isLoggedIn) {
            navigate('/portfolio');
        } else {
            navigate('/signin');
        }
    }
    return (
        <nav className="flex items-center justify-between w-full border-b border-gray-700" >
            <div className="flex items-center justify-start pl-3">
                <img className="h-10 w-auto" src="/src/assets/logo/png/Small-logo-color.png" alt="Small Logo" />
                {!isSmallIcon && (
                    <h1 className="text-2xl font-bold pl-3">Coinfolio</h1>
                )}
            </div>
            
            <div className="flex items-center gap-2">
                {!isSmallSearch && (
                    <div className="search-bar">
                        <input className="px-3 py-2 border border-gray-300 rounded-md" type="text" placeholder="Search" />
                    </div>
                )}
                <div className="buttons pr-1">
                    <button className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md" onClick={()=>navigateBasedOnLogging(isLoggedIn)}>Portfolio</button>
                    <button className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md">{signingButtonText}</button>
                </div>
            </div>
        </nav >
    );
};

export default Nav;
