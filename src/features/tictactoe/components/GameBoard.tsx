'use client';

import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { makeMove } from '@/store/slices/gameSlice';

export function GameBoard() {
  const { board, currentPlayer, roundStatus, players } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  
  const handleCellClick = (index: number) => {
    if (roundStatus === 'playing') {
      dispatch(makeMove(index));
    }
  };
  
  const getCellContent = (value: string | null) => {
    if (!value) return null;
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className={`text-5xl sm:text-6xl font-bold ${
          value === 'X' ? 'text-purple-600' : 'text-blue-600'
        }`}
      >
        {value}
      </motion.div>
    );
  };
  
  const currentPlayerName = players[currentPlayer]?.name || currentPlayer;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          {roundStatus === 'playing' ? (
            <>
              <span className={currentPlayer === 'X' ? 'text-purple-600' : 'text-blue-600'}>
                {currentPlayerName}
              </span>
              &apos;s turn
            </>
          ) : null}
        </h2>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl shadow-2xl"
      >
        {board.map((cell, index) => (
          <motion.button
            key={index}
            whileHover={!cell && roundStatus === 'playing' ? { scale: 1.05 } : {}}
            whileTap={!cell && roundStatus === 'playing' ? { scale: 0.95 } : {}}
            onClick={() => handleCellClick(index)}
            disabled={!!cell || roundStatus !== 'playing'}
            className={`
              w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-lg
              transition-all duration-200
              ${!cell && roundStatus === 'playing' 
                ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' 
                : 'bg-gray-50 cursor-not-allowed'
              }
              ${index % 3 !== 2 ? 'border-r-2 border-gray-300' : ''}
              ${index < 6 ? 'border-b-2 border-gray-300' : ''}
            `}
          >
            {getCellContent(cell)}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}