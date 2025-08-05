import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import gameReducer from './slices/gameSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import productReducer from './slices/productSlice';

const leaderboardPersistConfig = {
  key: 'leaderboard',
  storage,
};

const rootReducer = combineReducers({
  game: gameReducer,
  leaderboard: persistReducer(leaderboardPersistConfig, leaderboardReducer),
  products: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;