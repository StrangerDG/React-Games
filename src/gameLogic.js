// Initialize a 4x4 board with two random tiles
export const initBoard = () => {
    // Create empty 4x4 grid
    const board = Array(4).fill().map(() => Array(4).fill(0));
    
    // Add two random tiles to start
    return addRandomTile(addRandomTile(board));
  };
  
  // Add a random tile (90% chance of 2, 10% chance of 4) to an empty spot
  export const addRandomTile = (board) => {
    const emptyCells = [];
    
    // Find all empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    
    if (emptyCells.length === 0) return board;
    
    // Select random empty cell
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    // Place a 2 (90% chance) or 4 (10% chance)
    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    
    return newBoard;
  };
  
  // Move tiles left and merge if possible
  export const moveLeft = (board) => {
    let newBoard = [...board.map(row => [...row])];
    let moved = false;
    let scoreGain = 0;
    
    for (let i = 0; i < 4; i++) {
      const row = newBoard[i];
      const originalRow = [...row];
      
      // Remove zeros and store only the number values
      const nums = row.filter(val => val !== 0);
      
      // Merge adjacent identical numbers
      for (let j = 0; j < nums.length - 1; j++) {
        if (nums[j] === nums[j+1]) {
          nums[j] *= 2;
          scoreGain += nums[j];
          nums.splice(j+1, 1);
        }
      }
      
      // Fill the row with the merged numbers followed by zeros
      const newRow = [...nums, ...Array(4 - nums.length).fill(0)];
      newBoard[i] = newRow;
      
      // Check if the row changed
      if (!originalRow.every((val, index) => val === newRow[index])) {
        moved = true;
      }
    }
    
    return [newBoard, moved, scoreGain];
  };
  
  // Move tiles right and merge if possible
  export const moveRight = (board) => {
    // First reverse each row, perform left move, then reverse back
    let newBoard = board.map(row => [...row].reverse());
    let [movedBoard, moved, scoreGain] = moveLeft(newBoard);
    return [movedBoard.map(row => [...row].reverse()), moved, scoreGain];
  };
  
  // Move tiles up and merge if possible
  export const moveUp = (board) => {
    // Transpose the board, perform left move, then transpose back
    let transposed = transpose(board);
    let [movedBoard, moved, scoreGain] = moveLeft(transposed);
    return [transpose(movedBoard), moved, scoreGain];
  };
  
  // Move tiles down and merge if possible
  export const moveDown = (board) => {
    // Transpose, perform right move, then transpose back
    let transposed = transpose(board);
    let [movedBoard, moved, scoreGain] = moveRight(transposed);
    return [transpose(movedBoard), moved, scoreGain];
  };
  
  // Helper function to transpose a matrix (convert rows to columns)
  const transpose = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  };
  
  // Check if game is over (no possible moves left)
  export const checkGameOver = (board) => {
    // Check if there are any empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    
    // Check if any horizontal moves are possible
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === board[i][j+1]) {
          return false;
        }
      }
    }
    
    // Check if any vertical moves are possible
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === board[i+1][j]) {
          return false;
        }
      }
    }
    
    // If we get here, no moves are possible
    return true;
  };