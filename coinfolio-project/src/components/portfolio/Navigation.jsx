import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ toggleMenu }) {

    return (
        <nav className="flex justify-between items-center border-b border-gray-700 ">
            <div className="flex flex-row text-lg text-gray-400 font-semibold px-3">
                <NavLink
                    to=""
                    className={({ isActive }) =>
                        `px-2 hover:text-white ${isActive ? 'text-white' : ''}`
                    }
                    end
                >
                    Portfolio
                </NavLink>
                <NavLink
                    to="transactions"
                    className={({ isActive }) =>
                        `px-2 hover:text-white ${isActive ? 'text-white' : ''}`
                    }
                >
                    Transactions
                </NavLink>
                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        `px-2 hover:text-white ${isActive ? 'text-white' : ''}`
                    }
                >
                    Profile
                </NavLink>
            </div>
            <div className='m-2' >
                <button
                    onClick={toggleMenu}
                    className="px-2 text-center rounded bg-blue-700 text-white transition-colors"
                >
                    Add Transaction
                </button>
            </div>
        </nav>
    );

}

export default Navigation;