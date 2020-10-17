import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../';

const authEndpoint: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

interface Player {
  name: string;
  avatar: string;
  event: string;
}

interface AuthState {
  player: Player | null;
  isAuthenticated: boolean;
  loading: 'idle' | 'pending';
  error?: string;
}

const initialState: AuthState = {
  player: null,
  isAuthenticated: false,
  loading: 'idle',
  error: ''
};

interface AuthData {
  status: string;
  player: Player;
}

interface AuthError {
  error: string;
  status: 'fail';
}

interface RequestPayload {
  username: unknown;
  password?: unknown;
}

export const login = createAsyncThunk<AuthData,
  RequestPayload,
  // Types for ThunkAPI
  {
    rejectValue: AuthError
  }>(
  'auth/login',
  async (loginData: RequestPayload, {rejectWithValue}) => {
    const url = `${authEndpoint}/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.status === 400) {
        return rejectWithValue((await response.json()) as AuthError)
      }

      return (await response.json()) as AuthData;
    } catch (err) {
      return rejectWithValue({
        error: err,
        status: 'fail'
      })
    }
  }
);

export const logout = createAsyncThunk<AuthData,
  RequestPayload,
  // Types for ThunkAPI
  {
    rejectValue: AuthError
  }>(
  'auth/logout',
  async (userData: RequestPayload, {rejectWithValue}) => {
    const url = `${authEndpoint}/logout`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.status === 400) {
        return rejectWithValue((await response.json()) as AuthError)
      }

      return (await response.json()) as AuthData;
    } catch (err) {
      return rejectWithValue({
        error: err,
        status: 'fail'
      })
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.player = action.payload.player;
        state.isAuthenticated = true;
      }
    })
    builder.addCase(login.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';

        if (action.payload) {
          state.error = action.payload.error
        }
      }
    })
    builder.addCase(logout.pending, state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.player = null;
        state.isAuthenticated = false;
      }
    })
    builder.addCase(logout.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';

        if (action.payload) {
          state.error = action.payload.error
        }
      }
    })
  },
});

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
