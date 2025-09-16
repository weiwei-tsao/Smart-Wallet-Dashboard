import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setTransactions,
  setLoading,
  setError,
  clearTransactions,
} from '@/store/slices/transactionSlice';
import { walletService } from '@/services/web3/wallet';

export const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transaction);
  const wallet = useSelector((state: RootState) => state.wallet);

  const fetchTransactions = async () => {
    if (!wallet.address) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const txList = await walletService.getTransactions(wallet.address);
      dispatch(setTransactions(txList));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearTransactionsData = () => {
    dispatch(clearTransactions());
  };

  // Fetch transactions when wallet is connected
  useEffect(() => {
    if (wallet.isConnected && wallet.address) {
      fetchTransactions();
    } else {
      clearTransactionsData();
    }
  }, [wallet.isConnected, wallet.address]);

  return {
    ...transactions,
    fetchTransactions,
    clearTransactions: clearTransactionsData,
  };
};
