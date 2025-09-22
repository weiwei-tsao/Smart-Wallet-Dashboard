import { Request, Response, NextFunction } from 'express';
import { databaseService } from '../services/databaseService';
import { ApiResponse, CreateFavoriteRequest, AppError } from '../types';

export class FavoriteController {
  async createFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address, alias }: CreateFavoriteRequest = req.body;

      // Validate required fields
      if (!address) {
        throw new AppError('Address is required', 400);
      }

      // Validate address format
      if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new AppError('Invalid Ethereum address format', 400);
      }

      // Validate alias length if provided
      if (alias && alias.length > 100) {
        throw new AppError('Alias must be less than 100 characters', 400);
      }

      const favorite = await databaseService.createFavorite({ address, alias });

      const response: ApiResponse = {
        success: true,
        data: favorite,
        message: 'Favorite created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const favorites = await databaseService.getFavorites();

      const response: ApiResponse = {
        success: true,
        data: favorites,
        message: 'Favorites retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      // Validate ID parameter
      if (!id) {
        throw new AppError('ID parameter is required', 400);
      }

      const favorite = await databaseService.getFavoriteById(id);

      if (!favorite) {
        throw new AppError('Favorite not found', 404);
      }

      const response: ApiResponse = {
        success: true,
        data: favorite,
        message: 'Favorite retrieved successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { address, alias }: Partial<CreateFavoriteRequest> = req.body;

      // Validate ID parameter
      if (!id) {
        throw new AppError('ID parameter is required', 400);
      }

      // Validate address format if provided
      if (address && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new AppError('Invalid Ethereum address format', 400);
      }

      // Validate alias length if provided
      if (alias && alias.length > 100) {
        throw new AppError('Alias must be less than 100 characters', 400);
      }

      const favorite = await databaseService.updateFavorite(id, { address, alias });

      const response: ApiResponse = {
        success: true,
        data: favorite,
        message: 'Favorite updated successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      // Validate ID parameter
      if (!id) {
        throw new AppError('ID parameter is required', 400);
      }

      await databaseService.deleteFavorite(id);

      const response: ApiResponse = {
        success: true,
        message: 'Favorite deleted successfully',
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
