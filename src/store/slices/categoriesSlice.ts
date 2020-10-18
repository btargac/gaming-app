import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../';

const categoriesEndpoint: string = `${process.env.REACT_APP_API_BASE_URL}/categories` || 'http://localhost:3001/categories';

interface Category {
  id: number;
  name: string;
}

interface CategorySliceState {
  data: Category[];
  loading: 'idle' | 'pending';
}

const initialState: CategorySliceState = {
  data: [],
  loading: 'idle',
};

type CategoryData = Category[];

export const fetchCategories = createAsyncThunk(
  'games/fetchCategories',
  async () => {
    const response = await fetch(categoriesEndpoint);
    return (await response.json()) as CategoryData;
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    })
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.data = action.payload;
      }
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.data = [];
      }
    })
  },
});

export const selectCategories = (state: RootState): Category[] => state.categories.data;
export const selectLoading = (state: RootState): string => state.categories.loading;

export default categoriesSlice.reducer;
