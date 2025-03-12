import React from 'react';

const Tile = ({ value }) => {
  // Map of tile values to background colors
  const bgColors = {
    0: 'bg-gray-200',
    2: 'bg-yellow-100 text-gray-800',
    4: 'bg-yellow-200 text-gray-800',
    8: 'bg-orange-300 text-white',
    16: 'bg-orange-400 text-white',
    32: 'bg-orange-500 text-white',
    64: 'bg-orange-600 text-white',
    128: 'bg-yellow-300 text-white',
    256: 'bg-yellow-400 text-white',
    512: 'bg-yellow-500 text-white',
    1024: 'bg-yellow-600 text-white',
    2048: 'bg-yellow-700 text-white',
  };

  // Font size depending on the number of digits
  const fontSize = 
    value === 0 ? 'text-opacity-0' :
    value < 100 ? 'text-3xl' :
    value < 1000 ? 'text-2xl' :
    'text-xl';

  const bg = bgColors[value] || 'bg-gray-800 text-white';

  return (
    <div 
      className={`flex items-center justify-center w-16 h-16 font-bold rounded ${bg} ${fontSize} transition-all duration-100 transform`}
    >
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;