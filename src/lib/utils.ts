import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Player } from '../types/index';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateWinner = (squares: Player[]): Player => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};