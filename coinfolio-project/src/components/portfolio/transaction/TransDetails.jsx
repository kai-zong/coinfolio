

import React from 'react';

function TransDetails({ transaction, index, onTransactionDelete }) {

    const formattedDate = new Date(transaction.createdAt).toLocaleDateString();
    const formattedTime = new Date(transaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}); 

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            fetch(`http://localhost:3001/transaction/${transaction.id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    // Handle successful deletion
                    console.log('Transaction deleted:', transaction.id);
                    onTransactionDelete();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error deleting transaction:', error);
                });
        }

        // do nothing if user cancels the deletion
    };

    return (
        <tr key={transaction.id} className="divide-solid">
            

            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.id}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2 items-center"> {/* Added 'items-center' class */}
                <img src={transaction.coin.image} alt={transaction.coin.name} className="h-8 w-8" />
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.coin.symbol}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.coin.name}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">
                {transaction.transferIn ? 'TransferIn' : 'TransferOut'}
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">
                {formattedDate} {formattedTime}
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2">{transaction.amount}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">${transaction.amountInUSD.toFixed(2)}</td>
            <td className="border-t border-b border-gray-700 px-4 py-2">
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default TransDetails;