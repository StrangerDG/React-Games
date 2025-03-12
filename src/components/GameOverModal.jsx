import React from 'react';

const GameOverModal = ({ score, onReset }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
        <p className="mb-4">Your score: <strong>{score}</strong></p>
        <button 
          onClick={onReset} 
          className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;