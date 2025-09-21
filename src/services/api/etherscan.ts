import axios from 'axios';
import {
  ETHERSCAN_V2_API,
  SUPPORTED_CHAIN_IDS,
  API_CONFIG,
} from '@/constants/api';
import { Transaction, Token, TransactionListResponse } from '@/types';

export class EtherscanAPI {
  private apiKey: string;
  private baseURL: string;
  private chainId: number;

  constructor(
    apiKey: string,
    chainId: number = SUPPORTED_CHAIN_IDS.ETHEREUM_MAINNET
  ) {
    this.apiKey = apiKey;
    this.baseURL = ETHERSCAN_V2_API.BASE_URL;
    this.chainId = chainId;
  }

  /**
   * 更新链ID
   */
  updateChainId(chainId: number) {
    this.chainId = chainId;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    try {
      // 检查API密钥
      if (!this.apiKey || this.apiKey === 'YourEtherscanV2APIKeyHere') {
        throw new Error(
          'Etherscan API key is not configured. Please set ETHERSCAN_API_KEY in your .env.local file'
        );
      }

      const response = await axios.get<TransactionListResponse>(this.baseURL, {
        params: {
          chainid: this.chainId,
          module: 'account',
          action: ETHERSCAN_V2_API.ENDPOINTS.TRANSACTIONS,
          address,
          startblock: 0,
          endblock: 99999999,
          sort: 'desc',
          apikey: this.apiKey,
        },
        timeout: API_CONFIG.TIMEOUT,
      });

      if (response.data.status === '1') {
        return response.data.result;
      } else if (
        response.data.status === '0' &&
        response.data.message === 'No transactions found'
      ) {
        // 没有交易是正常情况，返回空数组而不是抛出错误
        return [];
      } else {
        console.error('Etherscan API Error:', response.data);
        throw new Error(
          response.data.message || 'Failed to fetch transactions'
        );
      }
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      if (error.message.includes('API key')) {
        throw error;
      }
      throw new Error('Failed to fetch transaction history');
    }
  }

  /**
   * Get token balances for an address
   * Note: This is a simplified implementation that returns ETH balance
   * For ERC-20 tokens, you would need to call tokenbalance for each token contract
   */
  async getTokenBalances(address: string): Promise<Token[]> {
    try {
      // 检查API密钥
      if (!this.apiKey || this.apiKey === 'YourEtherscanV2APIKeyHere') {
        throw new Error(
          'Etherscan API key is not configured. Please set ETHERSCAN_API_KEY in your .env.local file'
        );
      }

      // For now, we'll return ETH as the main token
      // In a real implementation, you would need to:
      // 1. Get a list of popular token contracts
      // 2. Call tokenbalance for each contract
      // 3. Filter out zero balances

      const response = await axios.get(this.baseURL, {
        params: {
          chainid: this.chainId,
          module: 'account',
          action: ETHERSCAN_V2_API.ENDPOINTS.BALANCE,
          address,
          tag: 'latest',
          apikey: this.apiKey,
        },
        timeout: API_CONFIG.TIMEOUT,
      });

      if (response.data.status === '1') {
        const ethBalance = response.data.result;
        // Convert wei to ETH
        const balanceInEth = (
          parseInt(ethBalance) / Math.pow(10, 18)
        ).toString();

        return [
          {
            contractAddress: '0x0000000000000000000000000000000000000000',
            tokenName: 'Ethereum',
            tokenSymbol: 'ETH',
            tokenDecimal: 18,
            balance: balanceInEth,
          },
        ];
      } else {
        console.error('Etherscan API Error:', response.data);
        throw new Error(
          response.data.message || 'Failed to fetch token balances'
        );
      }
    } catch (error: any) {
      console.error('Error fetching token balances:', error);
      if (error.message.includes('API key')) {
        throw error;
      }
      throw new Error('Failed to fetch token balances');
    }
  }
}

// Create singleton instance
const apiKey = process.env.ETHERSCAN_API_KEY || '';
export const etherscanAPI = new EtherscanAPI(apiKey);
