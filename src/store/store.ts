import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/walletSlice';
import transactionReducer from './slices/transactionSlice';
import tokenReducer from './slices/tokenSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    transaction: transactionReducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
