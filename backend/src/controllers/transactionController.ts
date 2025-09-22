import { Request, Response, NextFunction } from 'express';
import { etherscanService } from '../services/etherscanService';
import { redisService } from '../services/redisService';
import { config } from '../config';
import { ApiResponse, TransactionListResponse, AppError } from '../types';

export class TransactionController {
  async getTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      // Validate address parameter
      if (!address || typeof address !== 'string') {
        throw new AppError('Address parameter is required', 400);
      }

      // Validate address format (basic Ethereum address validation)
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new AppError('Invalid Ethereum address format', 400);
      }

      // Validate pagination parameters
      if (page < 1 || limit < 1 || limit > 100) {
        throw new AppError('Invalid pagination parameters', 400);
      }

      // Generate cache key
      const cacheKey = redisService.generateKey('transactions', `${address}:${page}:${limit}`);

      // Try to get from cache first
      const cachedData = await redisService.get<TransactionListResponse>(cacheKey);
      if (cachedData) {
        const response: ApiResponse<TransactionListResponse> = {
          success: true,
          data: cachedData,
          message: 'Transactions retrieved from cache',
        };
        res.json(response);
        return;
      }

      // Fetch from Etherscan API
      const result = await etherscanService.getTransactions(address, page, limit);

      // Create proper response format
      const transactionListResponse: TransactionListResponse = {
        transactions: result.transactions,
        total: result.total,
        page,
        limit,
      };

      // Cache the result
      await redisService.set(cacheKey, transactionListResponse, config.cache.ttl.transactions);

      const response: ApiResponse<TransactionListResponse> = {
        success: true,
        data: transactionListResponse,
        message: 'Transactions retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByHash(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { hash } = req.params;

      // Validate hash parameter
      if (!hash || typeof hash !== 'string') {
        throw new AppError('Transaction hash parameter is required', 400);
      }

      // Validate hash format (basic transaction hash validation)
      if (!/^0x[a-fA-F0-9]{64}$/.test(hash)) {
        throw new AppError('Invalid transaction hash format', 400);
      }

      // Generate cache key
      const cacheKey = redisService.generateKey('transaction', hash);

      // Try to get from cache first
      const cachedData = await redisService.get<any>(cacheKey);
      if (cachedData) {
        const response: ApiResponse<any> = {
          success: true,
          data: cachedData,
          message: 'Transaction retrieved from cache',
        };
        res.json(response);
        return;
      }

      // For now, we'll return a placeholder since Etherscan doesn't have a direct get transaction by hash endpoint
      // In a real implementation, you might want to use a different service or implement this differently
      throw new AppError('Transaction by hash endpoint not implemented yet', 501);
    } catch (error) {
      next(error);
    }
  }
}
