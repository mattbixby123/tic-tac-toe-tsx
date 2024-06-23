import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Player } from '../types';
import { calculateWinner } from '../lib/utils';

interface TicTacToeProps {}

const TicTacToe: React.FC<TicTacToeProps> = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);
  const [message, setMessage] = useState<string>("Your turn! Click a square to place your X.");

  const handleClick = (i: number): void => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    setMessage("Computer is thinking...");
  };

  const computerMove = useCallback((): void => {
    const emptySquares = board.reduce<number[]>((acc, val, idx) => {
      if (!val) acc.push(idx);
      return acc;
    }, []);
    if (emptySquares.length === 0) return;
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const newBoard = [...board];
    newBoard[emptySquares[randomIndex]] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
    setMessage("Your turn! Click a square to place your X.");
  }, [board]);

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner) {
      setWinner(newWinner);
      setMessage(newWinner === 'X' ? "You win!" : "Computer wins!");
    } else if (!board.includes(null)) {
      setMessage("It's a draw!");
    } else if (!isXNext) {
      const timer = setTimeout(() => {
        computerMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, computerMove]);

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setMessage("Your turn! Click a square to place your X.");
  };

  const renderSquare = (i: number): React.ReactNode => (
    <Button
      className="w-20 h-20 text-4xl font-bold"
      onClick={() => handleClick(i)}
      disabled={!isXNext || winner !== null || board[i] !== null}
    >
      {board[i]}
    </Button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
      <Alert className="mb-4">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[...Array(9)].map((_, i) => renderSquare(i))}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
};

export default TicTacToe;
