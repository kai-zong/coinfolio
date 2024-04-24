import React from 'react';
import { useUserAndPriceTable } from '../../../UserAndPriceTableContext';

const DELETE_TRANSACTION_URL = `${import.meta.env.VITE_Backend_API_URL}/transaction`;

function TransDetails({ transaction, index, onTransactionDelete, onTransactionEdit }) {
    const { accessToken } = useUserAndPriceTable();

    const formattedDate = new Date(transaction.createdAt).toLocaleDateString();
    const formattedTime = new Date(transaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            fetch(`${DELETE_TRANSACTION_URL}/${transaction.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
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

    const handleEdit = () => {
        onTransactionEdit(transaction);
    }

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
            <td className="border-t border-b border-gray-700 px-4 py-2" onClick={handleEdit}>
                {/* edit icon     */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
            </td>
            <td className="border-t border-b border-gray-700 px-4 py-2" onClick={handleDelete}>
                <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            </td>
        </tr>
    );
}

export default TransDetails;