'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { GameBoard } from './GameBoard';
import { ScoreBoard } from './ScoreBoard';
import { GameControls } from './GameControls';
import { RoundResult } from './RoundResult';

export function Game() {
  const router = useRouter();
  const { matchStatus, players } = useAppSelector(state => state.game);
  
  useEffect(() => {
    if (matchStatus === 'setup' || !players.X || !players.O) {
      router.push('/');
    }
  }, [matchStatus, players, router]);
  
  if (matchStatus === 'setup' || !players.X || !players.O) {
    return null;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 flex flex-col items-center order-2 lg:order-1">
          <RoundResult />
          <GameBoard />
          <div className="mt-6 lg:mt-8">
            <GameControls />
          </div>
        </div>
        
        <div className="lg:col-span-1 order-1 lg:order-2">
          <ScoreBoard />
        </div>
      </div>
    </div>
  );
}