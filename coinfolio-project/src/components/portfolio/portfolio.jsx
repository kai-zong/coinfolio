import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Portfolio() {
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
                    {/* Add more links as needed, following the same pattern */}
                </ul>
            </nav>
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}

export default Portfolio;