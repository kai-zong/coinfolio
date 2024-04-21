import React, { useState, useEffect } from 'react';


const EditAPIUrl = "http://localhost:3001/transaction/";

export default function EditForm({ transaction, onCancel, onEdit }) {
    // useState to manage the selected value based on the initial prop
    const [transferValue, setTransferValue] = useState(true);
    const [amount, setAmount] = useState(transaction.amount);
    const [coinPriceCost, setCoinPriceCost] = useState(transaction.coinPriceCost);
    
    // Format the date and time
    const formattedDate = new Date(transaction.createdAt).toLocaleDateString();
    const formattedTime = new Date(transaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log(transaction)

    // Effect to update state if the initial prop changes after component mount
    useEffect(() => {
        setTransferValue(transaction.transferIn);
        setAmount(transaction.amount);
        setCoinPriceCost(transaction.coinPriceCost);
    }, [transaction]);

    function handleSubmit(e) {
        e.preventDefault();
        // Create an object with the updated data from the form
        const updatedTransaction = {
            coinPriceCost: parseFloat(coinPriceCost),  // Ensure it is a float
            transferIn: transferValue,
            amount: parseFloat(amount),  // Convert string to float
        };

        // Send the PUT request with the updated data
        fetch(EditAPIUrl + transaction.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTransaction),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                onEdit(); // Call the onEdit method to refresh the transactions list
                return response.json();
            })
            .then(data => {
                console.log('Updated transaction:', data);
                // Call onCancel or any other method to close the form and refresh the transactions list
                onCancel();
            })
            .catch(error => {
                console.error('Error updating transaction:', error);
            });
    }

    

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
            <form onSubmit={handleSubmit}>

<div className="flex justify-center">
    <h2 className="text-2xl font-bold">Edit Transaction</h2>
</div>

<div className="justify-center">
    <div className="flex flex-col">
        <label>Coin:</label>
        <div className="flex items-center px-1">
            <img src={transaction.coin.image} alt={transaction.coin.name} className="h-5 w-5" />
            <p className="px-1">{transaction.coin.name} ({transaction.coin.symbol})</p>
        </div>
    </div>
    <div className="flex flex-col">
        <label>Transfer</label>
        <select name="transfer" id="transfer" value={transferValue ? "In" : "Out"}
            onChange={(e) => setTransferValue(e.target.value === "In")}>
            <option value="In">Transfer In</option>
            <option value="Out">Transfer Out</option>
        </select>
    </div>
    <div className="flex flex-col">
        <label>Amount:</label>
        <input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
    </div>
    <div>
        <label className="flex flex-col">Cost:</label>
        <input type="number" id="atPrice" name="atPrice" value={coinPriceCost} onChange={(e) => setCoinPriceCost(e.target.value)}/>
    </div>

    <div>
        <p>Amount in USD($): {amount * coinPriceCost}</p>
    </div>
    <div>
        <p>Date: {formattedDate} {formattedTime}</p>
    </div>
    <div className="flex flex-row justify-evenly p-5">
        <button type="button" onClick={onCancel}>
            Cancel
        </button>
        <button type="submit">
            Edit
        </button>
    </div>
</div>

</form>
            </div>
        </div>
    );
}