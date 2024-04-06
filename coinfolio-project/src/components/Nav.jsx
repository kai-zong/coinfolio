import React from 'react';
import { useMediaQuery } from 'react-responsive';
import {useNavigate} from 'react-router-dom';

function Nav() {
    const isSmallIcon = useMediaQuery({ query: '(max-width: 700px)' });
    const isSmallSearch = useMediaQuery({ query: '(max-width: 600px)' });
    let navigate = useNavigate();
    function navigateToPortfolio() {
        navigate('/portfolio');
    }
    return (
        <nav className="flex items-center justify-between w-full border-b border-gray-700" >
            <div className="logo items-center justify-start pl-3">
                {isSmallIcon ? (
                    <img className="h-10 w-auto" src="src/assets/logo/png/Small-logo-color.png" alt="Small Logo" />
                ) : (
                    <img className="h-10 w-auto" src="src/assets/logo/png/Large-logo-color.png" alt="Large Logo" />
                )}
            </div>
            <div className="flex items-center gap-2">
                {!isSmallSearch && (
                    <div className="search-bar">
                        <input className="px-3 py-2 border border-gray-300 rounded-md" type="text" placeholder="Search" />
                    </div>
                )}
                <div className="buttons pr-1">
                    <button className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md" onClick={navigateToPortfolio}>Portfolio</button>
                    <button className="px-3 py-2 m-1 bg-blue-700 text-white rounded-md">Sign In</button>
                </div>
            </div>
        </nav >
    );
};

export default Nav;
