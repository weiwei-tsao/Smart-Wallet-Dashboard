import axios from 'axios';
import { Transaction, Token, Favorite } from '@/types';

// BFF API 配置
const BFF_BASE_URL = 'http://localhost:3001';

export class BFFAPI {
  private baseURL: string;

  constructor(baseURL: string = BFF_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * 健康检查
   */
  async healthCheck() {
    try {
      const response = await axios.get(`${this.baseURL}/health`);
      return response.data;
    } catch (error) {
      console.error('BFF health check failed:', error);
      throw error;
    }
  }

  /**
   * 获取交易历史
   */
  async getTransactions(
    address: string,
    page: number = 1,
    limit: number = 10
  ): Promise<Transaction[]> {
    try {
      const response = await axios.get(`${this.baseURL}/api/transactions`, {
        params: { address, page, limit },
      });

      if (response.data.success) {
        return response.data.data?.transactions || [];
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch transactions'
        );
      }
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch transactions'
      );
    }
  }

  /**
   * 获取代币余额
   */
  async getTokens(address: string): Promise<Token[]> {
    try {
      const response = await axios.get(`${this.baseURL}/api/tokens`, {
        params: { address },
      });

      if (response.data.success) {
        return response.data.data?.tokens || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch tokens');
      }
    } catch (error: any) {
      console.error('Error fetching tokens:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch tokens'
      );
    }
  }

  /**
   * 获取收藏地址列表
   */
  async getFavorites(): Promise<Favorite[]> {
    try {
      const response = await axios.get(`${this.baseURL}/api/favorites`);

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch favorites');
      }
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch favorites'
      );
    }
  }

  /**
   * 添加收藏地址
   */
  async addFavorite(address: string, alias: string): Promise<Favorite> {
    try {
      const response = await axios.post(`${this.baseURL}/api/favorites`, {
        address,
        alias,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to add favorite');
      }
    } catch (error: any) {
      console.error('Error adding favorite:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to add favorite'
      );
    }
  }

  /**
   * 更新收藏地址
   */
  async updateFavorite(id: string, alias: string): Promise<Favorite> {
    try {
      const response = await axios.put(`${this.baseURL}/api/favorites/${id}`, {
        alias,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update favorite');
      }
    } catch (error: any) {
      console.error('Error updating favorite:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to update favorite'
      );
    }
  }

  /**
   * 删除收藏地址
   */
  async deleteFavorite(id: string): Promise<void> {
    try {
      const response = await axios.delete(
        `${this.baseURL}/api/favorites/${id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete favorite');
      }
    } catch (error: any) {
      console.error('Error deleting favorite:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to delete favorite'
      );
    }
  }
}

// 创建单例实例
export const bffAPI = new BFFAPI();
