import { web3Provider } from './provider';
import { EtherscanAPI } from '../api/etherscan';
import { Transaction, Token } from '@/types';
import { SUPPORTED_NETWORKS } from '@/constants/networks';
import { SUPPORTED_CHAIN_IDS } from '@/constants/api';

export class WalletService {
  private etherscanAPI: EtherscanAPI;

  constructor() {
    const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY || '';
    this.etherscanAPI = new EtherscanAPI(
      apiKey,
      SUPPORTED_CHAIN_IDS.ETHEREUM_MAINNET
    );
  }

  /**
   * Connect wallet and get basic info
   */
  async connectWallet() {
    const address = await web3Provider.connectWallet();
    const balance = await web3Provider.getBalance(address);
    const network = await web3Provider.getNetwork();

    // Update API based on current network
    this.updateAPIForNetwork(network.chainId);

    return {
      address,
      balance,
      network,
    };
  }

  /**
   * Update API instance based on network
   */
  private updateAPIForNetwork(chainId: number) {
    // 检查是否支持该链ID
    const supportedChainIds = Object.values(SUPPORTED_CHAIN_IDS);
    if (!supportedChainIds.includes(chainId)) {
      console.warn(
        `Unsupported network with chainId: ${chainId}. Using Ethereum Mainnet.`
      );
      chainId = SUPPORTED_CHAIN_IDS.ETHEREUM_MAINNET;
    }

    // 更新API的链ID
    this.etherscanAPI.updateChainId(chainId);
  }

  /**
   * Get wallet transactions
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    return await this.etherscanAPI.getTransactions(address);
  }

  /**
   * Get wallet token balances
   */
  async getTokenBalances(address: string): Promise<Token[]> {
    return await this.etherscanAPI.getTokenBalances(address);
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
   * Switch to a different network
   */
  async switchNetwork(chainId: number) {
    // Find the network config
    const networkKey = Object.keys(SUPPORTED_NETWORKS).find(
      (key) => SUPPORTED_NETWORKS[key].chainId === chainId
    );

    if (!networkKey) {
      throw new Error(`Unsupported network with chainId: ${chainId}`);
    }

    const networkConfig = SUPPORTED_NETWORKS[networkKey];

    await web3Provider.switchNetwork(chainId, networkConfig.metamaskConfig);
    // Update API for the new network
    this.updateAPIForNetwork(chainId);
  }

  /**
   * Add a new network to MetaMask
   */
  async addNetwork(networkConfig: any) {
    await web3Provider.addNetwork(networkConfig);
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
