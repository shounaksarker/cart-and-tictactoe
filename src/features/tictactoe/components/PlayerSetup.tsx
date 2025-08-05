'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store/hooks';
import { startNewGame } from '@/store/slices/gameSlice';
import { useRouter } from 'next/navigation';

export function PlayerSetup() {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [errors, setErrors] = useState({ playerX: '', playerO: '' });
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const validateForm = () => {
    const newErrors = { playerX: '', playerO: '' };
    
    if (playerX.trim().length < 2) {
      newErrors.playerX = 'Name must be at least 2 characters';
    }
    
    if (playerO.trim().length < 2) {
      newErrors.playerO = 'Name must be at least 2 characters';
    }
    
    if (playerX.trim() && playerO.trim() && playerX.trim() === playerO.trim()) {
      newErrors.playerO = 'Players must have different names';
    }
    
    setErrors(newErrors);
    return !newErrors.playerX && !newErrors.playerO;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(startNewGame({ playerX: playerX.trim(), playerO: playerO.trim() }));
      router.push('/game');
    }
  };
  
  const isFormValid = playerX.trim().length >= 2 && 
                     playerO.trim().length >= 2 && 
                     playerX.trim() !== playerO.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Player Setup
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Player &quot;X&quot;
            </label>
            <input
              type="text"
              value={playerX}
              onChange={(e) => {
                setPlayerX(e.target.value);
                if (errors.playerX) validateForm();
              }}
              className={`w-full px-4 py-3 rounded-lg border text-gray-500 ${
                errors.playerX ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              placeholder="Enter name for Player X"
            />
            {errors.playerX && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.playerX}
              </motion.p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of Player &quot;O&quot;
            </label>
            <input
              type="text"
              value={playerO}
              onChange={(e) => {
                setPlayerO(e.target.value);
                if (errors.playerO) validateForm();
              }}
              className={`w-full px-4 py-3 rounded-lg border text-gray-500 ${
                errors.playerO ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              placeholder="Enter name for Player O"
            />
            {errors.playerO && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.playerO}
              </motion.p>
            )}
          </motion.div>
          
          <motion.button
            type="submit"
            disabled={!isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all cursor-pointer ${
              isFormValid
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Match
          </motion.button>
        </form>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          <p>Best of 5 rounds</p>
          <p>First to &quot;3 wins&quot; takes the match!</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}