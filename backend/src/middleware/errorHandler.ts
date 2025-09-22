import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', error);

  // Handle AppError instances
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      message: error.message,
    });
    return;
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: error.message,
    });
    return;
  }

  // Handle Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    res.status(400).json({
      success: false,
      error: 'Database Error',
      message: 'A database operation failed',
    });
    return;
  }

  // Handle Prisma connection errors
  if (error.name === 'PrismaClientInitializationError') {
    res.status(500).json({
      success: false,
      error: 'Database Connection Error',
      message: 'Failed to connect to database',
    });
    return;
  }

  // Handle Redis errors
  if (error.message.includes('Redis')) {
    res.status(500).json({
      success: false,
      error: 'Cache Error',
      message: 'Cache service is temporarily unavailable',
    });
    return;
  }

  // Handle Axios errors
  if (error.message.includes('Etherscan')) {
    res.status(502).json({
      success: false,
      error: 'External API Error',
      message: 'External API service is temporarily unavailable',
    });
    return;
  }

  // Handle rate limit errors
  if (error.message.includes('Rate limit')) {
    res.status(429).json({
      success: false,
      error: 'Rate Limit Exceeded',
      message: 'Too many requests. Please try again later.',
    });
    return;
  }

  // Default error handler
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : error.message,
  });
};
