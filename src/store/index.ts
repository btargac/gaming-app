import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
