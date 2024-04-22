import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';

function TransactionForm({ isOpen, onClose, selectedCoin }) {
  const [transactionData, setTransactionData] = useState({
    coinId: '',
    coinPriceCost: '',
    amount: '',
    transferIn: true,  // Default to true, can be toggled
  });

  useEffect(() => {
    if (selectedCoin) {
      setTransactionData(prev => ({
        ...prev,
        coinId: selectedCoin
      }));
    }
  }, [selectedCoin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate total value whenever amount or coin price cost changes
  const totalValue = parseFloat(transactionData.amount || 0) * parseFloat(transactionData.coinPriceCost || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...transactionData,
      totalValue, // Adding total value to the data sent to the server
      coinId: transactionData.coinId // Ensure the coinId is correctly set from selectedCoin if needed
    };

    try {
      const response = await axios.post('http://localhost:3001/transaction', postData);
      console.log('Response:', response.data);
      alert('Transaction added successfully!');
      onClose(); // Close the modal only if the request is successful
    } catch (err) {
      console.error('Failed to submit transaction:', err);
      alert('Failed to add transaction'); // Provide feedback in case of an error
    }
  };
 
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="coinId">Coin</label>
          <span id="coinId" className="p-2 bg-gray-100 rounded block">{transactionData.coinId}</span>
        </div>
        <div>
          <label htmlFor="coinPriceCost">Coin Price Cost</label>
          <input
            type="number"
            id="coinPriceCost"
            name="coinPriceCost"
            value={transactionData.coinPriceCost}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transactionData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="totalValue">Total in USD</label>
          <span id="totalValue" className="p-2 bg-gray-100 rounded block">{totalValue.toFixed(2)}</span>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="transferIn"
              checked={transactionData.transferIn}
              onChange={() => setTransactionData(prev => ({
                ...prev,
                transferIn: !prev.transferIn
              }))}
            />
            Transfer In
          </label>
        </div>
        <button type="submit" className="btn-primary">
          Submit Transaction
        </button>
      </form>
    </Modal>
  );
}

export default TransactionForm;