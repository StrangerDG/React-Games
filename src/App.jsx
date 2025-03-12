import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameOverModal from './components/GameOverModal';
import { initBoard, moveLeft, moveRight, moveUp, moveDown, checkGameOver, addRandomTile } from './gameLogic';

function App() {
  const [board, setBoard] = useState(() => initBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score.toString());
    }
  }, [score, bestScore]);

  const handleKeyDown = (event) => {
    if (gameOver) return;

    let newBoard = [...board];
    let moved = false;
    let scoreGain = 0;

    switch (event.key) {
      case 'ArrowLeft':
        [newBoard, moved, scoreGain] = moveLeft(newBoard);
        break;
      case 'ArrowRight':
        [newBoard, moved, scoreGain] = moveRight(newBoard);
        break;
      case 'ArrowUp':
        [newBoard, moved, scoreGain] = moveUp(newBoard);
        break;
      case 'ArrowDown':
        [newBoard, moved, scoreGain] = moveDown(newBoard);
        break;
      default:
        return;
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(prevScore => prevScore + scoreGain);
      
      if (checkGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setBoard(initBoard());
    setScore(0);
    setGameOver(false);
  };

  const handleSwipe = (direction) => {
    if (gameOver) return;

    const keyMap = {
      left: 'ArrowLeft',
      right: 'ArrowRight',
      up: 'ArrowUp',
      down: 'ArrowDown'
    };

    handleKeyDown({ key: keyMap[direction] });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">2048</h1>
          <ScoreBoard score={score} bestScore={bestScore} />
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">Join the tiles, get to <strong>2048</strong>!</p>
          <p className="text-gray-600 text-sm">Use arrow keys to move tiles or swipe on mobile.</p>
        </div>
        
        <div className="mb-4">
          <button 
            onClick={resetGame} 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            New Game
          </button>
        </div>
        
        <Board board={board} onSwipe={handleSwipe} />
        
        {gameOver && <GameOverModal score={score} onReset={resetGame} />}
      </div>
    </div>
  );
}

export default App;