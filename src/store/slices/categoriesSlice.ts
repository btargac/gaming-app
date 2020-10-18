import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

const categoriesEndpoint: string = `${process.env.REACT_APP_API_BASE_URL}/categories` || 'http://localhost:3001/categories';

interface Category {
  id: number;
  name: string;
}

interface CategorySliceState {
  data: Category[];
  loading: 'idle' | 'pending';
  selectedCategory: number;
}

const initialState: CategorySliceState = {
  data: [],
  loading: 'idle',
  selectedCategory: 0
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
  reducers: {
    selectCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload
    }
  },
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

export const { selectCategory } = categoriesSlice.actions;
export const selectCategories = (state: RootState): Category[] => state.categories.data;
export const selectedCategory = (state: RootState): number => state.categories.selectedCategory;
export const selectLoading = (state: RootState): string => state.categories.loading;

export default categoriesSlice.reducer;
