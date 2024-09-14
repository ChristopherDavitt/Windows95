import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 20px);
  grid-gap: 1px;
  background-color: #bdbdbd;
  border: 3px solid #7b7b7b;
  padding: 3px;
`;

const Cell = styled(Button)<{ $revealed: boolean; $value: number | 'mine' }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: ${props => {
    if (props.$revealed) {
      switch (props.$value) {
        case 1: return 'blue';
        case 2: return 'green';
        case 3: return 'red';
        case 4: return 'purple';
        case 5: return 'maroon';
        case 6: return 'turquoise';
        case 7: return 'black';
        case 8: return 'gray';
        default: return 'black';
      }
    }
    return 'black';
  }};
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResetButton = styled(Button)`
  margin-bottom: 10px;
`;

type CellType = {
  value: number | 'mine';
  revealed: boolean;
  flagged: boolean;
};

const createBoard = (): CellType[][] => {
  const board = Array(9).fill(null).map(() => 
    Array(9).fill(null).map(() => ({ value: 0, revealed: false, flagged: false }))
  );

  // Place mines
  let minesPlaced = 0;
  while (minesPlaced < 10) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col].value !== 'mine') {
      board[row][col].value = 'mine';
      minesPlaced++;
    }
  }

  // Calculate numbers
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value !== 'mine') {
        let count = 0;
        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            if (row + r >= 0 && row + r < 9 && col + c >= 0 && col + c < 9) {
              if (board[row + r][col + c].value === 'mine') count++;
            }
          }
        }
        board[row][col].value = count;
      }
    }
  }

  return board;
};

const Minesweeper: React.FC = () => {
  const [board, setBoard] = useState<CellType[][]>(createBoard());
  const [gameOver, setGameOver] = useState(false);

  const revealCell = (row: number, col: number) => {
    if (gameOver || board[row][col].revealed || board[row][col].flagged) return;

    const newBoard = [...board];
    newBoard[row][col].revealed = true;

    if (board[row][col].value === 'mine') {
      setGameOver(true);
    } else if (board[row][col].value === 0) {
      // Reveal adjacent cells
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          if (row + r >= 0 && row + r < 9 && col + c >= 0 && col + c < 9) {
            revealCell(row + r, col + c);
          }
        }
      }
    }

    setBoard(newBoard);
  };

  const flagCell = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || board[row][col].revealed) return;

    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(createBoard());
    setGameOver(false);
  };

  return (
    <GameContainer>
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
      <Grid>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              onClick={() => revealCell(rowIndex, colIndex)}
              onContextMenu={(e) => flagCell(e, rowIndex, colIndex)}
              $revealed={cell.revealed}
              $value={cell.value}
            >
              {cell.revealed
                ? cell.value === 'mine'
                  ? '💣'
                  : cell.value || ''
                : cell.flagged
                ? '🚩'
                : ''}
            </Cell>
          ))
        )}
      </Grid>
      {gameOver && <div>Game Over!</div>}
    </GameContainer>
  );
};

export default Minesweeper;