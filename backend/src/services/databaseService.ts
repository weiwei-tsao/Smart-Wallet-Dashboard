import { PrismaClient, Favorite } from '@prisma/client';
import { CreateFavoriteRequest, AppError } from '../types';

class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw new AppError('Failed to connect to database', 500);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log('Database disconnected successfully');
    } catch (error) {
      console.error('Failed to disconnect from database:', error);
    }
  }

  // Favorite CRUD operations
  async createFavorite(data: CreateFavoriteRequest): Promise<Favorite> {
    try {
      // Check if address already exists
      const existingFavorite = await this.prisma.favorite.findUnique({
        where: { address: data.address },
      });

      if (existingFavorite) {
        throw new AppError('Address already exists in favorites', 409);
      }

      const favorite = await this.prisma.favorite.create({
        data: {
          address: data.address,
          alias: data.alias,
        },
      });

      return favorite;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error creating favorite:', error);
      throw new AppError('Failed to create favorite', 500);
    }
  }

  async getFavorites(): Promise<Favorite[]> {
    try {
      const favorites = await this.prisma.favorite.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw new AppError('Failed to fetch favorites', 500);
    }
  }

  async getFavoriteById(id: string): Promise<Favorite | null> {
    try {
      const favorite = await this.prisma.favorite.findUnique({
        where: { id },
      });

      return favorite;
    } catch (error) {
      console.error('Error fetching favorite by ID:', error);
      throw new AppError('Failed to fetch favorite', 500);
    }
  }

  async getFavoriteByAddress(address: string): Promise<Favorite | null> {
    try {
      const favorite = await this.prisma.favorite.findUnique({
        where: { address },
      });

      return favorite;
    } catch (error) {
      console.error('Error fetching favorite by address:', error);
      throw new AppError('Failed to fetch favorite', 500);
    }
  }

  async updateFavorite(id: string, data: Partial<CreateFavoriteRequest>): Promise<Favorite> {
    try {
      // Check if favorite exists
      const existingFavorite = await this.prisma.favorite.findUnique({
        where: { id },
      });

      if (!existingFavorite) {
        throw new AppError('Favorite not found', 404);
      }

      // If updating address, check if new address already exists
      if (data.address && data.address !== existingFavorite.address) {
        const addressExists = await this.prisma.favorite.findUnique({
          where: { address: data.address },
        });

        if (addressExists) {
          throw new AppError('Address already exists in favorites', 409);
        }
      }

      const favorite = await this.prisma.favorite.update({
        where: { id },
        data: {
          address: data.address,
          alias: data.alias,
        },
      });

      return favorite;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error updating favorite:', error);
      throw new AppError('Failed to update favorite', 500);
    }
  }

  async deleteFavorite(id: string): Promise<boolean> {
    try {
      // Check if favorite exists
      const existingFavorite = await this.prisma.favorite.findUnique({
        where: { id },
      });

      if (!existingFavorite) {
        throw new AppError('Favorite not found', 404);
      }

      await this.prisma.favorite.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Error deleting favorite:', error);
      throw new AppError('Failed to delete favorite', 500);
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
