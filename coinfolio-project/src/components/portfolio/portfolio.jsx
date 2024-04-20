import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {useState, useEffect} from 'react';

function Portfolio() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const menuClasses = `fixed inset-y-0 left-0 transform bg-gray-800 text-white transition duration-300 ease-in-out z-20 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`;


    return (
        <div className="flex">
             <nav className="w-32 border-r-2 border-gray-200"> {/* Adjusted width and added border */}
                <ul className="space-y-1"> {/* Reduced space between list items */}
                    <li className="px-2 py-1 hover:bg-gray-100"> {/* Narrower padding, add hover effect */}
                        <Link to="">Portfolio</Link>
                    </li>
                    <li className="px-2 py-1 hover:bg-gray-100"> {/* Narrower padding, add hover effect */}
                        <Link to="transactions">Transactions</Link>
                    </li>
                    <li className="px-2 py-1">
                        <button onClick={toggleMenu} className="hover:bg-gray-100 w-full text-center py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                            Add Transaction
                        </button>
                    </li>
                    {/* Add more links as needed, following the same pattern */}
                </ul>
            </nav>

            <div className={menuClasses}>
                <div className="w-32 p-2">
                    <ul className="space-y-1">
                        <li className="px-2 py-1 hover:bg-gray-700">Coin 1</li>
                        <li className="px-2 py-1 hover:bg-gray-700">Coin 2</li>
                        {/* Add more coins as needed */}
                    </ul>
                    <button onClick={closeMenu} className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                        Cancel
                    </button>
                </div>
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}

export default Portfolio;