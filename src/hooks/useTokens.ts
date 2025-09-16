import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  setTokens,
  setLoading,
  setError,
  clearTokens,
} from '@/store/slices/tokenSlice';
import { walletService } from '@/services/web3/wallet';

export const useTokens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.token);
  const wallet = useSelector((state: RootState) => state.wallet);

  const fetchTokens = async () => {
    if (!wallet.address) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const tokenList = await walletService.getTokenBalances(wallet.address);
      dispatch(setTokens(tokenList));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearTokensData = () => {
    dispatch(clearTokens());
  };

  // Fetch tokens when wallet is connected
  useEffect(() => {
    if (wallet.isConnected && wallet.address) {
      fetchTokens();
    } else {
      clearTokensData();
    }
  }, [wallet.isConnected, wallet.address]);

  return {
    ...tokens,
    fetchTokens,
    clearTokens: clearTokensData,
  };
};
