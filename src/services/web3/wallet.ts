import { web3Provider } from './provider';
import { etherscanAPI } from '../api/etherscan';
import { Transaction, Token } from '@/types';

export class WalletService {
  /**
   * Connect wallet and get basic info
   */
  async connectWallet() {
    const address = await web3Provider.connectWallet();
    const balance = await web3Provider.getBalance(address);
    const network = await web3Provider.getNetwork();

    return {
      address,
      balance,
      network,
    };
  }

  /**
   * Get wallet transactions
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    return await etherscanAPI.getTransactions(address);
  }

  /**
   * Get wallet token balances
   */
  async getTokenBalances(address: string): Promise<Token[]> {
    return await etherscanAPI.getTokenBalances(address);
  }

  /**
   * Get wallet balance
   */
  async getBalance(address: string): Promise<string> {
    return await web3Provider.getBalance(address);
  }

  /**
   * Get current network
   */
  async getNetwork() {
    return await web3Provider.getNetwork();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners(
    onAccountsChanged: (accounts: string[]) => void,
    onChainChanged: (chainId: string) => void
  ) {
    web3Provider.onAccountsChanged(onAccountsChanged);
    web3Provider.onChainChanged(onChainChanged);
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    web3Provider.removeAllListeners();
  }
}

// Create singleton instance
export const walletService = new WalletService();
