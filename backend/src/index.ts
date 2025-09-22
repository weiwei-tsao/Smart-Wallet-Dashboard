import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { config, validateConfig } from './config';
import { errorHandler } from './middleware/errorHandler';
import { redisService } from './services/redisService';
import { databaseService } from './services/databaseService';
import { etherscanService } from './services/etherscanService';

// Import routes
import transactionRoutes from './routes/transactionRoutes';
import tokenRoutes from './routes/tokenRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

// Validate configuration
validateConfig();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Rate limit exceeded. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const redisHealth = await redisService.healthCheck();
    const dbHealth = await databaseService.healthCheck();
    const etherscanHealth = await etherscanService.healthCheck();

    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        redis: redisHealth ? 'healthy' : 'unhealthy',
        database: dbHealth ? 'healthy' : 'unhealthy',
        etherscan: etherscanHealth ? 'healthy' : 'unhealthy',
      },
    };

    const isHealthy = redisHealth && dbHealth && etherscanHealth;
    res.status(isHealthy ? 200 : 503).json(health);
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Health check failed',
    });
  }
});

// API routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/favorites', favoriteRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Smart Wallet Dashboard BFF API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      transactions: '/api/transactions',
      tokens: '/api/tokens',
      favorites: '/api/favorites',
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Initialize services and start server
const startServer = async (): Promise<void> => {
  try {
    console.log('Starting Smart Wallet Dashboard BFF...');

    // Connect to Redis
    await redisService.connect();
    console.log('✅ Redis connected');

    // Connect to Database
    await databaseService.connect();
    console.log('✅ Database connected');

    // Start server
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📊 Health check: http://localhost:${config.port}/health`);
      console.log(`🔗 API Base URL: http://localhost:${config.port}/api`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('HTTP server closed');
        
        try {
          await redisService.disconnect();
          console.log('Redis disconnected');
          
          await databaseService.disconnect();
          console.log('Database disconnected');
          
          console.log('Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();
