'use client';

import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';

export function RoundResult() {
  const { roundStatus, winner, players } = useAppSelector(state => state.game);
  
  if (roundStatus === 'playing') return null;
  
  const winnerName = winner ? players[winner]?.name : null;
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center mb-6"
    >
      {roundStatus === 'won' && winner && (
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className={winner === 'X' ? 'text-purple-600' : 'text-blue-600'}>
              {winnerName}
            </span>{' '}
            wins!
          </h2>
          <p className="text-gray-600">+2 points for the win!</p>
        </div>
      )}
      
      {roundStatus === 'draw' && (
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-2">It&apos;s a Draw!</h2>
          <p className="text-gray-600">No points awarded this round</p>
        </div>
      )}
    </motion.div>
  );
}