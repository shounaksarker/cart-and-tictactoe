import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '@/types';

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  players: {
    X: null,
    O: null,
  },
  currentRound: 1,
  roundWins: {
    X: 0,
    O: 0,
  },
  matchStatus: 'setup',
  roundStatus: 'playing',
  winner: null,
  finalWinner: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<{ playerX: string; playerO: string }>) => {
      state.players.X = {
        id: crypto.randomUUID(),
        name: action.payload.playerX,
        score: 0,
        symbol: 'X',
      };
      state.players.O = {
        id: crypto.randomUUID(),
        name: action.payload.playerO,
        score: 0,
        symbol: 'O',
      };
      // Reset all game state for new players
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.currentRound = 1;
      state.roundWins = { X: 0, O: 0 };
      state.matchStatus = 'playing';
      state.roundStatus = 'playing';
      state.winner = null;
      state.finalWinner = null;
    },
    
    makeMove: (state, action: PayloadAction<number>) => {
      if (state.board[action.payload] || state.roundStatus !== 'playing') return;
      
      state.board[action.payload] = state.currentPlayer;
      
      const winner = checkWinner(state.board);
      if (winner) {
        state.roundStatus = 'won';
        state.winner = winner;
        state.roundWins[winner]++;
        
        if (state.players[winner]) {
          state.players[winner].score += 2;
        }
        const loser = winner === 'X' ? 'O' : 'X';
        if (state.players[loser]) {
          state.players[loser].score += 1;
        }
        
        if (state.roundWins[winner] >= 3 || state.currentRound === 5) {
          state.matchStatus = 'finished';
          state.finalWinner = determineFinalWinner(state.roundWins);
        }
      } else if (state.board.every(cell => cell !== null)) {
        state.roundStatus = 'draw';
        
        if (state.currentRound === 5) {
          state.matchStatus = 'finished';
          state.finalWinner = determineFinalWinner(state.roundWins);
        }
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    
    nextRound: (state) => {
      if (state.currentRound < 5 && state.matchStatus === 'playing') {
        state.currentRound++;
        state.board = Array(9).fill(null);
        state.currentPlayer = 'X';
        state.roundStatus = 'playing';
        state.winner = null;
      }
    },
    
    resetCurrentRound: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.roundStatus = 'playing';
      state.winner = null;
    },
    
    resetMatch: () => {
      return { ...initialState };
    },
    
    startNewMatch: (state) => {
      return {
        ...initialState,
        players: state.players,
        matchStatus: 'playing',
      };
    },
    
    startNewGame: (state, action: PayloadAction<{ playerX: string; playerO: string }>) => {
      return {
        ...initialState,
        players: {
          X: {
            id: crypto.randomUUID(),
            name: action.payload.playerX,
            score: 0,
            symbol: 'X',
          },
          O: {
            id: crypto.randomUUID(),
            name: action.payload.playerO,
            score: 0,
            symbol: 'O',
          },
        },
        matchStatus: 'playing',
      };
    },
  },
});

function checkWinner(board: (string | null)[]): 'X' | 'O' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as 'X' | 'O';
    }
  }
  
  return null;
}

function determineFinalWinner(roundWins: { X: number; O: number }): 'X' | 'O' | null {
  if (roundWins.X > roundWins.O) return 'X';
  if (roundWins.O > roundWins.X) return 'O';
  return null;
}

export const {
  setPlayers,
  makeMove,
  nextRound,
  resetCurrentRound,
  resetMatch,
  startNewMatch,
  startNewGame,
} = gameSlice.actions;

export default gameSlice.reducer;