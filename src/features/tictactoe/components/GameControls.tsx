'use client';

import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetCurrentRound, nextRound } from '@/store/slices/gameSlice';
import { useRouter } from 'next/navigation';

export function GameControls() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { roundStatus, matchStatus } = useAppSelector(state => state.game);
  
  const handleResetRound = () => {
    dispatch(resetCurrentRound());
  };
  
  const handleNextRound = () => {
    if (matchStatus === 'finished') {
      router.push('/victory');
    } else {
      dispatch(nextRound());
    }
  };
  
  const handleViewLeaderboard = () => {
    router.push('/leaderboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-3 justify-center"
    >
      {roundStatus === 'playing' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetRound}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Reset Board
        </motion.button>
      )}
      
      {(roundStatus === 'won' || roundStatus === 'draw') && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextRound}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          {matchStatus === 'finished' ? 'View Results' : 'Next Round'}
        </motion.button>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleViewLeaderboard}
        className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
      >
        Leaderboard
      </motion.button>
    </motion.div>
  );
}