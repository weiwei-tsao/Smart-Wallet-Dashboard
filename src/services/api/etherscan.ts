import axios from 'axios';
import { ETHERSCAN_API, API_CONFIG } from '@/constants/api';
import {
  Transaction,
  Token,
  TransactionListResponse,
  TokenListResponse,
} from '@/types';

export class EtherscanAPI {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseURL = ETHERSCAN_API.BASE_URL;
  }

  /**
   * Get transaction history for an address
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    try {
      const response = await axios.get<TransactionListResponse>(this.baseURL, {
        params: {
          module: 'account',
          action: ETHERSCAN_API.ENDPOINTS.TRANSACTIONS,
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
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch transactions'
        );
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transaction history');
    }
  }

  /**
   * Get token balances for an address
   */
  async getTokenBalances(address: string): Promise<Token[]> {
    try {
      const response = await axios.get<TokenListResponse>(this.baseURL, {
        params: {
          module: 'account',
          action: ETHERSCAN_API.ENDPOINTS.TOKEN_BALANCES,
          address,
          apikey: this.apiKey,
        },
        timeout: API_CONFIG.TIMEOUT,
      });

      if (response.data.status === '1') {
        return response.data.result;
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch token balances'
        );
      }
    } catch (error) {
      console.error('Error fetching token balances:', error);
      throw new Error('Failed to fetch token balances');
    }
  }
}

// Create singleton instance
const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY || '';
export const etherscanAPI = new EtherscanAPI(apiKey);
