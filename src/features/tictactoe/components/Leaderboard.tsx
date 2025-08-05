'use client';

import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearLeaderboard } from '@/store/slices/leaderboardSlice';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function Leaderboard() {
  const entries = useAppSelector(state => state.leaderboard.entries);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the leaderboard?')) {
      dispatch(clearLeaderboard());
    }
  };
  
    const handleBackToGame = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 relative"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoBack}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </motion.button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToGame}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              New Game
            </motion.button>

            {entries.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Clear All
              </motion.button>
            )}
          </div>
        </div>

        {!entries.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No games played yet</p>
            <p className="text-gray-400 mt-2">
              Start a game to see scores here!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Player
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Score
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Games
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    W/L/D
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">
                    Win Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
                  const winRate =
                    entry.gamesPlayed > 0
                      ? ((entry.wins / entry.gamesPlayed) * 100).toFixed(1)
                      : "0.0";

                  return (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div
                          className={`
                          w-8 h-8 rounded-full flex items-center justify-center font-bold
                          ${
                            index === 0
                              ? "bg-yellow-400 text-white"
                              : index === 1
                              ? "bg-gray-400 text-white"
                              : index === 2
                              ? "bg-orange-400 text-white"
                              : "bg-gray-200 text-gray-600"
                          }
                        `}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {entry.name}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-xl font-bold text-purple-600">
                          {entry.totalScore}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {entry.gamesPlayed}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {entry.wins}/{entry.losses}/{entry.draws}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-medium ${
                            parseFloat(winRate) >= 50
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {winRate}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}