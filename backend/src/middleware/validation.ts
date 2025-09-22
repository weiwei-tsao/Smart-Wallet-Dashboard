import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

// Validate Ethereum address format
export const validateAddress = (req: Request, res: Response, next: NextFunction): void => {
  const { address } = req.query;

  if (address && typeof address === 'string') {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new AppError('Invalid Ethereum address format', 400);
    }
  }

  next();
};

// Validate pagination parameters
export const validatePagination = (req: Request, res: Response, next: NextFunction): void => {
  const { page, limit } = req.query;

  if (page) {
    const pageNum = parseInt(page as string, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      throw new AppError('Page must be a positive integer', 400);
    }
  }

  if (limit) {
    const limitNum = parseInt(limit as string, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      throw new AppError('Limit must be a positive integer between 1 and 100', 400);
    }
  }

  next();
};

// Validate request body for required fields
export const validateRequiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = fields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }

    next();
  };
};

// Validate JSON content type
export const validateJsonContentType = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) {
      throw new AppError('Content-Type must be application/json', 400);
    }
  }

  next();
};
