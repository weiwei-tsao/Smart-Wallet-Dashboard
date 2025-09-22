import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import {
  EtherscanApiResponse,
  EtherscanTransaction,
  EtherscanTokenBalance,
  Transaction,
  Token,
  AppError,
} from '../types';

class EtherscanService {
  private client: AxiosInstance;
  private readonly chainId: number = 1; // Ethereum mainnet

  constructor() {
    this.client = axios.create({
      baseURL: config.etherscan.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `Etherscan API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error('Etherscan API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(
          'Etherscan API Response Error:',
          error.response?.data || error.message
        );
        return Promise.reject(error);
      }
    );
  }

  private async makeRequest<T>(
    module: string,
    action: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const response = await this.client.get<any>('', {
        params: {
          chainid: this.chainId,
          module,
          action,
          apikey: config.etherscan.apiKey,
          ...params,
        },
      });

      // Etherscan V2 API returns different formats:
      // - For successful requests: direct array or object
      // - For errors: {status: "0", message: "error", result: null}
      if (
        response.data &&
        typeof response.data === 'object' &&
        'status' in response.data
      ) {
        const { status, message, result } = response.data;
        if (status !== '1') {
          throw new AppError(`Etherscan API Error: ${message}`, 400);
        }
        return result;
      }

      // Direct array/object response (success case)
      return response.data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new AppError(
            'Rate limit exceeded. Please try again later.',
            429
          );
        }
        throw new AppError(
          `Etherscan API request failed: ${error.message}`,
          500
        );
      }

      throw new AppError('Unexpected error occurred', 500);
    }
  }

  async getTransactions(
    address: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ transactions: Transaction[]; total: number }> {
    try {
      const offset = (page - 1) * limit;

      const result = await this.makeRequest<EtherscanTransaction[]>(
        'account',
        'txlist',
        {
          address,
          startblock: 0,
          endblock: 99999999,
          page: Math.ceil(offset / 10000) + 1, // Etherscan uses 10000 as max page size
          offset: offset % 10000,
          sort: 'desc',
        }
      );

      // Transform Etherscan format to our format
      const transactions: Transaction[] = result.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: parseInt(tx.timeStamp, 10),
        blockNumber: tx.blockNumber,
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        isError: tx.isError,
      }));

      // For simplicity, we'll return the requested limit
      // In a real implementation, you might want to get the total count separately
      const total = transactions.length;

      return {
        transactions: transactions.slice(0, limit),
        total,
      };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  async getTokenBalances(address: string): Promise<Token[]> {
    try {
      // For now, we'll return ETH as the main token since tokenlist might not be available in V2
      // In a real implementation, you would need to call tokenbalance for each token contract
      const ethBalance = await this.getEthBalance(address);

      // Convert wei to ETH
      const balanceInEth = (
        parseInt(ethBalance, 10) / Math.pow(10, 18)
      ).toString();

      return [
        {
          contractAddress: '0x0000000000000000000000000000000000000000',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          balance: ethBalance,
          balanceFormatted: balanceInEth,
        },
      ];
    } catch (error) {
      console.error('Error fetching token balances:', error);
      throw error;
    }
  }

  async getEthBalance(address: string): Promise<string> {
    try {
      const result = await this.makeRequest<string>('account', 'balance', {
        address,
        tag: 'latest',
      });

      return result;
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      throw error;
    }
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      // Try to get a simple balance check for a known address
      await this.getEthBalance('0x0000000000000000000000000000000000000000');
      return true;
    } catch (error) {
      console.error('Etherscan health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const etherscanService = new EtherscanService();
