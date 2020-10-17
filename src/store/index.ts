import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
