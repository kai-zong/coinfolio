import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import CoinMenu from './transaction/CoinMenu';
import TransactionForm from './transaction/TransactionForm';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';

function Portfolio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { displayedCoins } = useUserAndPriceTable();

    const filteredCoins = displayedCoins.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
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
            <Navigation toggleMenu={toggleMenu} />
            <div className={menuClasses}>
                <CoinMenu
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filteredCoins={filteredCoins}
                    handleCoinClick={handleCoinClick}
                    closeMenu={closeMenu}
                />
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
            <TransactionForm isOpen={isFormOpen} onClose={closeForm} selectedCoin={selectedCoin} />
        </div>
    );
}

export default Portfolio;