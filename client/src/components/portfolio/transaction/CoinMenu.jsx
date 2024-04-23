import React from 'react';

function CoinMenu({ searchQuery, setSearchQuery, filteredCoins, handleCoinClick, closeMenu }) {
    return (
        <div className="w-54 p-2 h-full flex flex-col bg-gray-800 text-white"> {/* Increased width and set background color */}
            <input
                type="text"
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500" // Changed input styles for dark theme
            />
            <div className="flex-grow overflow-y-auto">
                <ul className="space-y-1">
                    {filteredCoins.map(coin => (
                        <li key={coin.id} className="px-2 py-1 hover:bg-gray-600 cursor-pointer" onClick={() => handleCoinClick(coin)}>
                            {coin.name}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={closeMenu} className="w-full mt-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-center">
                Cancel
            </button>
        </div>
    );
}

export default CoinMenu;