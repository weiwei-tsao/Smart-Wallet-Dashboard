import { ethers } from 'ethers';
import { NetworkInfo } from '@/types';

export class Web3Provider {
  private provider: ethers.BrowserProvider | null = null;

  constructor() {
    this.initializeProvider();
  }

  private initializeProvider() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    return (
      typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
    );
  }

  /**
   * Connect to MetaMask wallet
   */
  async connectWallet(): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    if (!this.provider) {
      this.initializeProvider();
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get signer
      const signer = await this.provider!.getSigner();
      const address = await signer.getAddress();

      return address;
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the connection request');
      }
      throw new Error('Failed to connect wallet');
    }
  }

  /**
   * Get current account address
   */
  async getAddress(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const signer = await this.provider.getSigner();
    return await signer.getAddress();
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  /**
   * Get current network information
   */
  async getNetwork(): Promise<NetworkInfo> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name || 'Unknown',
      ensAddress: network.ensAddress,
    };
  }

  /**
   * Listen for account changes
   */
  onAccountsChanged(callback: (accounts: string[]) => void) {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  /**
   * Listen for chain changes
   */
  onChainChanged(callback: (chainId: string) => void) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', callback);
    }
  }

  /**
   * Remove all listeners
   */
  removeAllListeners() {
    if (window.ethereum) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  }
}

// Create singleton instance
export const web3Provider = new Web3Provider();
