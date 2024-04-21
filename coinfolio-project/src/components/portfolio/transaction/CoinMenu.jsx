import React from 'react';

function CoinMenu({ searchQuery, setSearchQuery, filteredCoins, handleCoinClick, closeMenu }) {
    return (
        <div className="w-32 p-2">
            <input
                type="text"
                placeholder="Search coins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 text-black"
            />
            <ul className="space-y-1">
                {filteredCoins.map(coin => (
                    <li key={coin.id} className="px-2 py-1 hover:bg-gray-700 cursor-pointer" onClick={() => handleCoinClick(coin.name)}>
                        {coin.name}
                    </li>
                ))}
            </ul>
            <button onClick={closeMenu} className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                Cancel
            </button>
        </div>
    );
}

export default CoinMenu;