import { Request, Response, NextFunction } from 'express';
import { etherscanService } from '../services/etherscanService';
import { redisService } from '../services/redisService';
import { config } from '../config';
import { ApiResponse, TokenListResponse, AppError } from '../types';

export class TokenController {
  async getTokens(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address } = req.query;

      // Validate address parameter
      if (!address || typeof address !== 'string') {
        throw new AppError('Address parameter is required', 400);
      }

      // Validate address format (basic Ethereum address validation)
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new AppError('Invalid Ethereum address format', 400);
      }

      // Generate cache key
      const cacheKey = redisService.generateKey('tokens', address);

      // Try to get from cache first
      const cachedData = await redisService.get<TokenListResponse>(cacheKey);
      if (cachedData) {
        const response: ApiResponse<TokenListResponse> = {
          success: true,
          data: cachedData,
          message: 'Tokens retrieved from cache',
        };
        res.json(response);
        return;
      }

      // Fetch from Etherscan API
      const tokens = await etherscanService.getTokenBalances(address);

      // Also get ETH balance
      const ethBalance = await etherscanService.getEthBalance(address);
      const ethToken: any = {
        contractAddress: '0x0000000000000000000000000000000000000000',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        balance: ethBalance,
        balanceFormatted: (parseInt(ethBalance, 10) / Math.pow(10, 18)).toFixed(6),
      };

      // Add ETH to the tokens list
      const allTokens = [ethToken, ...tokens];

      const result: TokenListResponse = {
        tokens: allTokens,
        total: allTokens.length,
      };

      // Cache the result
      await redisService.set(cacheKey, result, config.cache.ttl.tokens);

      const response: ApiResponse<TokenListResponse> = {
        success: true,
        data: result,
        message: 'Tokens retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getTokenByAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address, tokenAddress } = req.query;

      // Validate address parameter
      if (!address || typeof address !== 'string') {
        throw new AppError('Address parameter is required', 400);
      }

      // Validate tokenAddress parameter
      if (!tokenAddress || typeof tokenAddress !== 'string') {
        throw new AppError('Token address parameter is required', 400);
      }

      // Validate address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new AppError('Invalid Ethereum address format', 400);
      }

      // Validate token address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
        throw new AppError('Invalid token address format', 400);
      }

      // Generate cache key
      const cacheKey = redisService.generateKey('token', `${address}:${tokenAddress}`);

      // Try to get from cache first
      const cachedData = await redisService.get<any>(cacheKey);
      if (cachedData) {
        const response: ApiResponse<any> = {
          success: true,
          data: cachedData,
          message: 'Token retrieved from cache',
        };
        res.json(response);
        return;
      }

      // For now, we'll return a placeholder since this would require a more specific API call
      // In a real implementation, you might want to implement this differently
      throw new AppError('Token by address endpoint not implemented yet', 501);
    } catch (error) {
      next(error);
    }
  }
}
