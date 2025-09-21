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
      await window.ethereum!.request({ method: 'eth_requestAccounts' });

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
      window.ethereum.on('chainChanged', (chainId: string) => {
        // 重新初始化 provider 以处理网络变化
        this.initializeProvider();
        callback(chainId);
      });
    }
  }

  /**
   * Switch to a different network
   */
  async switchNetwork(chainId: number, networkConfig?: any) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      console.error('Network switch error:', error);

      // If the network doesn't exist, add it
      if (error.code === 4902) {
        if (networkConfig) {
          try {
            await this.addNetwork(networkConfig);
            // After adding, try to switch again
            await window.ethereum!.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
          } catch (addError: any) {
            console.error('Add network error:', addError);
            if (addError.code === 4001) {
              throw new Error('User rejected the network addition request');
            }
            throw new Error(`Failed to add network: ${addError.message}`);
          }
        } else {
          throw new Error(
            `Network with chainId ${chainId} is not added to MetaMask. Please add it manually.`
          );
        }
      } else if (error.code === 4001) {
        throw new Error('User rejected the network switch request');
      } else {
        throw error;
      }
    }
  }

  /**
   * Add a new network to MetaMask
   */
  async addNetwork(networkConfig: any) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum!.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
      });
    } catch (error) {
      throw new Error('Failed to add network to MetaMask');
    }
  }

  /**
   * Remove specific event listener
   */
  removeListener(eventName: string, callback?: (...args: any[]) => void) {
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener(eventName, callback!);
    }
  }

  /**
   * Remove all listeners (simplified implementation)
   */
  removeAllListeners() {
    // Note: Since we don't track individual callbacks,
    // we'll just let the provider handle cleanup automatically
    // In a production app, you'd want to track callbacks to remove them properly
    console.log('Removing all event listeners');
  }
}

// Create singleton instance
export const web3Provider = new Web3Provider();
