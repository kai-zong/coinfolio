import React from 'react';
import { useMediaQuery } from 'react-responsive';

function Nav() {
    const isSmallIcon = useMediaQuery({ query: '(max-width: 700px)' });
    const isSmallSearch = useMediaQuery({ query: '(max-width: 600px)' });
    return (
        <nav className="flex items-center justify-between p-5 w-full" >
            <div className="logo">
                {isSmallIcon ? (
                    <img className="h-10 w-auto" src="src/assets/logo/png/Small-logo-color.png" alt="Small Logo" />
                ) : (
                    <img className="h-10 w-auto" src="src/assets/logo/png/Large-logo-color.png" alt="Large Logo" />
                )}
            </div>
            {!isSmallSearch && (
                <div className = "search-bar flex items-center gap-2">
            <input className = "px-3 py-2 border border-gray-300 rounded-md" type = "text" placeholder = "Search" />
        </div>)
}
<div className="buttons flex gap-2">
    <button className="px-3 py-2 bg-blue-700 text-white rounded-md">Portfolio</button>
    <button className="px-3 py-2 bg-blue-700 text-white rounded-md">Sign In</button>
</div>
        </nav >
    );
};

export default Nav;
