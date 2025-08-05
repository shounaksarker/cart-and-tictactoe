'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetMatch } from '@/store/slices/gameSlice';
import { updateLeaderboard } from '@/store/slices/leaderboardSlice';
import { useRouter } from 'next/navigation';
import { Confetti } from './Confetti';

export function VictoryScreen() {
  const { players, roundWins, finalWinner, matchStatus } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  useEffect(() => {
    if (matchStatus !== 'finished' || !players.X || !players.O) {
      router.push('/');
      return;
    }
    
    // Update leaderboard
    const playerX = players.X;
    const playerO = players.O;
    
    if (finalWinner === 'X') {
      dispatch(updateLeaderboard({ 
        playerName: playerX.name, 
        score: playerX.score, 
        result: 'win' 
      }));
      dispatch(updateLeaderboard({ 
        playerName: playerO.name, 
        score: playerO.score, 
        result: 'loss' 
      }));
    } else if (finalWinner === 'O') {
      dispatch(updateLeaderboard({ 
        playerName: playerO.name, 
        score: playerO.score, 
        result: 'win' 
      }));
      dispatch(updateLeaderboard({ 
        playerName: playerX.name, 
        score: playerX.score, 
        result: 'loss' 
      }));
    } else {
      dispatch(updateLeaderboard({ 
        playerName: playerX.name, 
        score: playerX.score, 
        result: 'draw' 
      }));
      dispatch(updateLeaderboard({ 
        playerName: playerO.name, 
        score: playerO.score, 
        result: 'draw' 
      }));
    }
  }, [matchStatus, players, finalWinner, dispatch, router]);
  
  if (matchStatus !== 'finished' || !players.X || !players.O) {
    return null;
  }
  
  const winner = finalWinner ? players[finalWinner] : null;
  
  const handleNewPlayers = () => {
    dispatch(resetMatch());
    router.push('/');
  };
  
  const handleViewLeaderboard = () => {
    router.push('/leaderboard');
  };

  return (
    <>
      {winner && <Confetti />}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center px-4"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
        >
          {winner ? (
            <>
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              >
                <span className={finalWinner === 'X' ? 'text-purple-600' : 'text-blue-600'}>
                  {winner.name}
                </span> Wins!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-gray-600 mb-8"
              >
                Final Score: {roundWins.X} - {roundWins.O}
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600 mb-4"
              >
                It&apos;s a Draw!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-gray-600 mb-8"
              >
                Final Score: {roundWins.X} - {roundWins.O}
              </motion.p>
            </>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 mb-8"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Player Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-medium text-purple-600">{players.X.name}</p>
                  <p className="text-2xl font-bold">{players.X.score}</p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-blue-600">{players.O.name}</p>
                  <p className="text-2xl font-bold">{players.O.score}</p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          > 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewPlayers}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              New Players
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewLeaderboard}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Leaderboard
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}