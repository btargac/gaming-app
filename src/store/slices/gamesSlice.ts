import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../';

const gameListEndpoint: string = `${process.env.REACT_APP_API_BASE_URL}/games` || 'http://localhost:3001/games';

export interface Game {
  categoryIds: number[];
  code: string;
  description: string;
  icon: string;
  name: string;
}

interface GamesState {
  data: Game[];
  loading: 'idle' | 'pending';
}

const initialState: GamesState = {
  data: [],
  loading: 'idle',
};

type GamesData = Game[];

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const response = await fetch(gameListEndpoint);
    return (await response.json()) as GamesData;
  }
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGames.pending, state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    })
      builder.addCase(fetchGames.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.data = action.payload;
      }
    })
    builder.addCase(fetchGames.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.data = [];
      }
    })
  },
});

export const selectGames = (state: RootState): Game[] => state.games.data;
export const selectLoading = (state: RootState): string => state.games.loading;

export default gamesSlice.reducer;
