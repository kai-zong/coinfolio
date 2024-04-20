import React, { useState, useEffect } from 'react';
import TransDetails from './TransDetails';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const userId = 1; // Replace with the actual user ID

    useEffect(() => {
        fetchTransactions();
    }, [userId]); // run effect only once when the component mounts

    const fetchTransactions = async () => {
        fetch(`http://localhost:3001/transactions/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTransactions(data.transactions);
            })
            .catch(error => {
                console.error('Failed to fetch transactions:', error);
            });
    };

    const handleDeleteTransaction = () => {
        fetchTransactions();
    };

    return (
        <div className='w-full px-5 m-3'>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Transaction ID</th>
                        <th className="px-4 py-2">Logo</th>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Coin</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">AmountInUSD</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((transaction, index) => (
                            <TransDetails key={index} transaction={transaction} onTransactionDelete={handleDeleteTransaction} />
                        ))}
                </tbody>
            </table>
        </div>

    );
}

export default Transactions;