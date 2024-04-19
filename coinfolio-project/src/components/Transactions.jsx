import React, { useState, useEffect } from 'react';
import TransDetails from './TransDetails';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const userId = 1; // Replace with the actual user ID

    useEffect(() => {
        fetch(`http://localhost:3001/transactions`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // 由于后端返回的是用户对象，包括用户的交易列表，我们将交易列表设置到状态中
                setTransactions(data.transactions);
            })
            .catch(error => {
                console.error('Failed to fetch transactions:', error);
            });
    }, [userId]); // 当userId改变时重新运行effect

    console.log('Transactions:', transactions);

    return (
        <ul className='flex-column justify-evenly m-5 border-2 p-5'>
            {transactions.map((transaction, index) => (
                <TransDetails transaction={transaction} />
            ))}
        </ul>
    );
}

export default Transactions;