import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import {useUserAndPriceTable} from "../../../UserAndPriceTableContext.jsx"

function TransactionForm({ isOpen, onClose, selectedCoin }) {
  const [transactionData, setTransactionData] = useState({
    coinId: '',
    coinPriceCost: '',
    transferIn: true,
    amount: '',
      // Default to true, can be toggled
  });

  const { accessToken } = useUserAndPriceTable();

  useEffect(() => {
    if (selectedCoin.id) {
      setTransactionData(prev => ({
        ...prev,
        coinId: selectedCoin.id
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
      userId: 1, // Hardcoded for now, will be dynamic in the future
    };

    try {
      const response = await axios.post('http://localhost:3001/transaction', postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      });
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
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded-lg text-white">
        <div className="mb-2">
          <label htmlFor="coinId" className="block text-sm font-medium text-gray-300">Coin</label>
          <span id="coinId" className="p-2 bg-gray-100 text-gray-900 rounded block">{selectedCoin.name}</span>
        </div>
        <div className="mb-2">
          <label htmlFor="coinPriceCost" className="block text-sm font-medium text-gray-300">Coin Price Cost</label>
          <input
            type="number"
            id="coinPriceCost"
            name="coinPriceCost"
            value={transactionData.coinPriceCost}
            onChange={handleInputChange}
            required
            min="0.01"
            className="mt-1 block w-full p-2 bg-gray-100 border-gray-300 rounded-md shadow-sm text-gray-900"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transactionData.amount}
            onChange={handleInputChange}
            required
            min="0.01"
            className="mt-1 block w-full p-2 bg-gray-100 border-gray-300 rounded-md shadow-sm text-gray-900"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="totalValue" className="block text-sm font-medium text-gray-300">Total in USD</label>
          <span id="totalValue" className="p-2 bg-gray-100 text-gray-900 rounded block">{totalValue.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="transferIn"
              checked={transactionData.transferIn}
              onChange={() => setTransactionData(prev => ({
                ...prev,
                transferIn: !prev.transferIn
              }))}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-300">Transfer In</span>
          </label>
        </div>
        <button type="submit" className="btn-primary w-full">
          Submit Transaction
        </button>
      </form>
    </Modal>
  );
}

export default TransactionForm;