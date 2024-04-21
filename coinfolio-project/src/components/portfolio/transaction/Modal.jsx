import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <button onClick={onClose} className="float-right font-bold">x</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;