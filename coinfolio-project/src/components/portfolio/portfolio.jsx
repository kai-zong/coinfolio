import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import TransactionForm from './transaction/TransactionForm';  // Import your transaction form component

function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);  // To hold the selected coin data

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);  // Set the selected coin
        setIsFormOpen(true);    // Open the transaction form
        setIsMenuOpen(false);   // Optionally close the menu
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
                    <ul className="space-y-1">
                        <li className="px-2 py-1 hover:bg-gray-700 cursor-pointer" onClick={() => handleCoinClick('Coin 1')}>Coin 1</li>
                        <li className="px-2 py-1 hover:bg-gray-700 cursor-pointer" onClick={() => handleCoinClick('Coin 2')}>Coin 2</li>
                        {/* More coins can be added similarly */}
                    </ul>
                    <button onClick={closeMenu} className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                        Cancel
                    </button>
                </div>
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Transaction Form Modal */}
            <TransactionForm isOpen={isFormOpen} onClose={closeForm} selectedCoin={selectedCoin} />
        </div>
    );
}

export default Portfolio;