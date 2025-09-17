import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  connectWallet,
  disconnectWallet,
  updateBalance,
  updateNetwork,
  setLoading,
  setError,
} from '@/store/slices/walletSlice';
import { walletService } from '@/services/web3/wallet';

export const useWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useSelector((state: RootState) => state.wallet);

  const handleConnect = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const walletInfo = await walletService.connectWallet();

      dispatch(
        connectWallet({
          address: walletInfo.address,
          network: walletInfo.network,
        })
      );

      dispatch(updateBalance(walletInfo.balance));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDisconnect = () => {
    dispatch(disconnectWallet());
    walletService.removeEventListeners();
  };

  const refreshBalance = async () => {
    if (!wallet.address) return;

    try {
      const balance = await walletService.getBalance(wallet.address);
      dispatch(updateBalance(balance));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const refreshNetwork = async () => {
    try {
      const network = await walletService.getNetwork();
      dispatch(updateNetwork(network));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  // Setup event listeners when wallet is connected
  useEffect(() => {
    if (wallet.isConnected) {
      walletService.setupEventListeners(
        (accounts: string[]) => {
          if (accounts.length === 0) {
            handleDisconnect();
          } else {
            // Account changed, update address
            dispatch(
              connectWallet({
                address: accounts[0],
                network: wallet.network!,
              })
            );
          }
        },
        (_chainId: string) => {
          // Chain changed, refresh network info
          refreshNetwork();
        }
      );
    }

    return () => {
      walletService.removeEventListeners();
    };
  }, [wallet.isConnected]);

  return {
    ...wallet,
    connect: handleConnect,
    disconnect: handleDisconnect,
    refreshBalance,
    refreshNetwork,
  };
};
