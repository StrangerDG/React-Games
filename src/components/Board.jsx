import React, { useRef, useEffect } from 'react';
import Tile from './Tile';

const Board = ({ board, onSwipe }) => {
  const boardRef = useRef(null);
  let touchStartX = 0;
  let touchStartY = 0;

  useEffect(() => {
    const boardElement = boardRef.current;
    if (!boardElement) return;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      
      // Determine if the swipe was primarily horizontal or vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 20) {
          onSwipe('right');
        } else if (diffX < -20) {
          onSwipe('left');
        }
      } else {
        // Vertical swipe
        if (diffY > 20) {
          onSwipe('down');
        } else if (diffY < -20) {
          onSwipe('up');
        }
      }
    };

    boardElement.addEventListener('touchstart', handleTouchStart);
    boardElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      boardElement.removeEventListener('touchstart', handleTouchStart);
      boardElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe]);

  return (
    <div 
      ref={boardRef}
      className="grid grid-cols-4 gap-2 bg-gray-300 p-2 rounded-md touch-manipulation"
    >
      {board.map((row, rowIndex) => 
        row.map((value, colIndex) => (
          <Tile 
            key={`${rowIndex}-${colIndex}`} 
            value={value} 
          />
        ))
      )}
    </div>
  );
};

export default Board;