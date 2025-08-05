export interface Player {
  id: string;
  name: string;
  score: number;
  symbol: 'X' | 'O';
}

export interface GameState {
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  players: {
    X: Player | null;
    O: Player | null;
  };
  currentRound: number;
  roundWins: {
    X: number;
    O: number;
  };
  matchStatus: 'setup' | 'playing' | 'finished';
  roundStatus: 'playing' | 'won' | 'draw';
  winner: 'X' | 'O' | null;
  finalWinner: 'X' | 'O' | null;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: string;
}