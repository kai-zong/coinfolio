import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center">
          <h2>Transaction Form</h2>
          <button onClick={onClose} className="text-xl cursor-pointer">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;