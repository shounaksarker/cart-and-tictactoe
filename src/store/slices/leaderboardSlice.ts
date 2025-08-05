import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeaderboardEntry } from '@/types';

interface LeaderboardState {
  entries: LeaderboardEntry[];
}

const initialState: LeaderboardState = {
  entries: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    updateLeaderboard: (
      state,
      action: PayloadAction<{
        playerName: string;
        score: number;
        result: 'win' | 'loss' | 'draw';
      }>
    ) => {
      const { playerName, score, result } = action.payload;
      const existingEntry = state.entries.find(entry => entry.name === playerName);
      
      if (existingEntry) {
        existingEntry.totalScore += score;
        existingEntry.gamesPlayed++;
        if (result === 'win') existingEntry.wins++;
        else if (result === 'loss') existingEntry.losses++;
        else existingEntry.draws++;
        existingEntry.lastPlayed = new Date().toISOString();
      } else {
        state.entries.push({
          id: crypto.randomUUID(),
          name: playerName,
          totalScore: score,
          gamesPlayed: 1,
          wins: result === 'win' ? 1 : 0,
          losses: result === 'loss' ? 1 : 0,
          draws: result === 'draw' ? 1 : 0,
          lastPlayed: new Date().toISOString(),
        });
      }
      
      state.entries.sort((a, b) => b.totalScore - a.totalScore);
    },
    
    clearLeaderboard: (state) => {
      state.entries = [];
    },
    
    loadLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.entries = action.payload;
    },
  },
});

export const { updateLeaderboard, clearLeaderboard, loadLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;