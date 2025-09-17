import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string; // Etherscan returns as string
  isError: string; // Etherscan returns as "0" or "1"
  gasUsed: string;
  gasPrice: string;
  blockNumber: string;
  blockHash: string;
  nonce: string;
  transactionIndex: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  txreceipt_status: string;
  confirmations: string;
}

export interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.error = null;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setTransactions,
  addTransaction,
  clearTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
