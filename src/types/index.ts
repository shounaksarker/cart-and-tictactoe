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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  tags: string[];
  isActive: boolean;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: string[];
}