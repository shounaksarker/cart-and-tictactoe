'use client';

import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';

export function ScoreBoard() {
  const { players, roundWins, currentRound } = useAppSelector(state => state.game);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-xl p-4 sm:p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Match Score</h3>
      
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Round {currentRound} of 5</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentRound / 5) * 100}%` }}
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">X</span>
              </div>
              <span className="font-medium">{players.X?.name || 'Player X'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.span
                key={`x-wins-${roundWins.X}`}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-purple-600"
              >
                {roundWins.X}
              </motion.span>
              <span className="text-sm text-gray-600">wins</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">O</span>
              </div>
              <span className="font-medium">{players.O?.name || 'Player O'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <motion.span
                key={`o-wins-${roundWins.O}`}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-blue-600"
              >
                {roundWins.O}
              </motion.span>
              <span className="text-sm text-gray-600">wins</span>
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p>Win: +2 points</p>
            <p>Loss: +1 point</p>
            <p>Draw: 0 points</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}