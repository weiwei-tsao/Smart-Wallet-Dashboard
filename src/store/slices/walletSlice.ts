import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NetworkInfo {
  chainId: number;
  name: string;
  ensAddress?: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  network: NetworkInfo | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  isConnected: false,
  address: null,
  balance: null,
  network: null,
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    connectWallet: (
      state,
      action: PayloadAction<{ address: string; network: NetworkInfo }>
    ) => {
      state.isConnected = true;
      state.address = action.payload.address;
      state.network = action.payload.network;
      state.error = null;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.balance = null;
      state.network = null;
      state.error = null;
    },
    updateBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    updateNetwork: (state, action: PayloadAction<NetworkInfo>) => {
      state.network = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  connectWallet,
  disconnectWallet,
  updateBalance,
  updateNetwork,
} = walletSlice.actions;

export default walletSlice.reducer;
