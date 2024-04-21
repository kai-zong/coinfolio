import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import TransactionForm from './transaction/TransactionForm';  // Import your transaction form component

function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);  
    const [searchQuery, setSearchQuery] = useState('');
    const [coins, setCoins] = useState([
        { id: 1, name: 'Coin 1' },
        { id: 2, name: 'Coin 2' },
        { id: 3, name: 'Coin 3' }
    ]);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);  
        setIsFormOpen(true);    
        setIsMenuOpen(false);   
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedCoin(null);
    };

    const menuClasses = `fixed inset-y-0 left-0 transform bg-gray-800 text-white transition duration-300 ease-in-out z-20 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`;

    return (
        <div className="flex">
            <nav className="w-32 border-r-2 border-gray-200">
                <ul className="space-y-1">
                    <li className="px-2 py-1 hover:bg-gray-100">
                        <Link to="">Portfolio</Link>
                    </li>
                    <li className="px-2 py-1 hover:bg-gray-100">
                        <Link to="transactions">Transactions</Link>
                    </li>
                    <li className="px-2 py-1">
                        <button onClick={toggleMenu} className="hover:bg-gray-100 w-full text-center py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                            Add Transaction
                        </button>
                    </li>
                </ul>
            </nav>

            <div className={menuClasses}>
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
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>

            <TransactionForm isOpen={isFormOpen} onClose={closeForm} selectedCoin={selectedCoin} />
        </div>
    );
}

export default Portfolio;