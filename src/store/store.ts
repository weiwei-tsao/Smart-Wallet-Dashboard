import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import walletReducer from './slices/walletSlice';
import transactionReducer from './slices/transactionSlice';
import tokenReducer from './slices/tokenSlice';

const makeStore = () =>
  configureStore({
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

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
