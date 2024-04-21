import React, { useState, useEffect } from 'react';
import Modal from './Modal';

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
    console.log({...transactionData, totalValue}); // Now also logs the total value
    onClose();
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