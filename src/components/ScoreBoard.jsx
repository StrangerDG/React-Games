import React from 'react';

const ScoreBoard = ({ score, bestScore }) => {
  return (
    <div className="flex space-x-3">
      <div className="bg-gray-700 text-white p-2 rounded text-center">
        <div className="text-xs uppercase font-bold">Score</div>
        <div className="font-bold text-xl">{score}</div>
      </div>
      <div className="bg-gray-700 text-white p-2 rounded text-center">
        <div className="text-xs uppercase font-bold">Best</div>
        <div className="font-bold text-xl">{bestScore}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;