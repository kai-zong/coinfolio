import React, { useState, useEffect } from 'react';
import Modal from './Modal';

function TransactionForm({ isOpen, onClose, selectedCoin }) {
  const [transactionData, setTransactionData] = useState({
    coinId: '',
    coinPriceCost: '',
    amount: '',
    transferIn: true,  // Default to true, can be toggled
  });

  // Effect to update form when coin is selected or modal is opened
  useEffect(() => {
    if (selectedCoin) {
      setTransactionData(prev => ({
        ...prev,
        coinId: selectedCoin
      }));
    }
  }, [selectedCoin]);

  const handleInputChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(transactionData);
    onClose();  // Use passed onClose to close modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="coinId">Coin</label>
          <input
            type="text"
            id="coinId"
            name="coinId"
            value={transactionData.coinId}
            onChange={handleInputChange}
            required
          />
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
          <label>
            <input
              type="checkbox"
              name="transferIn"
              checked={transactionData.transferIn}
              onChange={() => setTransactionData({
                ...transactionData,
                transferIn: !transactionData.transferIn
              })}
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