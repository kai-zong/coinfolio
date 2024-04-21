import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ toggleMenu }) {
    return (
        <nav className="w-32 border-r-2 border-gray-200">
            <ul className="space-y-1">
                <li className="px-2 py-1 hover:bg-gray-100">
                    <Link to="">Portfolio</Link>
                </li>
                <li className="px-2 py-1 hover:bg-gray-100">
                    <Link to="transactions">Transactions</Link>
                </li>
                <li className="px-2 py-1 hover:bg-gray-100">
                    <Link to="profile">Profile</Link>
                </li>
                <li className="px-2 py-1">
                    <button onClick={toggleMenu} className="hover:bg-gray-100 w-full text-center py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                        Add Transaction
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;