import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Token {
  contractAddress: string;
  tokenName: string;
  tokenSymbol: string;
  balance: string;
  tokenDecimal: number;
  logo?: string;
}

export interface TokenState {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  tokens: [],
  isLoading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.error = null;
    },
    addToken: (state, action: PayloadAction<Token>) => {
      const existingIndex = state.tokens.findIndex(
        (token) => token.contractAddress === action.payload.contractAddress
      );
      if (existingIndex >= 0) {
        state.tokens[existingIndex] = action.payload;
      } else {
        state.tokens.push(action.payload);
      }
    },
    clearTokens: (state) => {
      state.tokens = [];
    },
  },
});

export const { setLoading, setError, setTokens, addToken, clearTokens } =
  tokenSlice.actions;

export default tokenSlice.reducer;
