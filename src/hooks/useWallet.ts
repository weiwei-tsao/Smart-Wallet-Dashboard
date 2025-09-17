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

  const switchNetwork = async (chainId: number) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await walletService.switchNetwork(chainId);

      // 等待一小段时间让网络切换完成
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Refresh network info after switching
      await refreshNetwork();
      // Refresh balance after switching
      await refreshBalance();

      // 清除任何之前的错误
      dispatch(setError(null));
    } catch (error: any) {
      console.error('Network switch error:', error);
      // 检查是否是用户取消操作
      if (
        error.message.includes('User rejected') ||
        error.message.includes('User denied')
      ) {
        dispatch(setError('Network switch was cancelled by user'));
      } else if (
        error.message.includes('deprecated') ||
        error.message.includes('弃用')
      ) {
        dispatch(
          setError(
            'This network is deprecated. Please use Sepolia Testnet instead.'
          )
        );
      } else {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
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
        async (chainId: string) => {
          // Chain changed, refresh network info and balance
          console.log('Chain changed to:', chainId);
          try {
            await refreshNetwork();
            await refreshBalance();
          } catch (error) {
            console.error('Error refreshing after chain change:', error);
          }
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
    switchNetwork,
  };
};
