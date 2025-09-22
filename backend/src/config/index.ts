import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Redis Configuration
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD || undefined,
  },
  
  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/smart_wallet_dashboard',
  },
  
  // Etherscan API Configuration
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
    baseUrl: process.env.ETHERSCAN_BASE_URL || 'https://api.etherscan.io/v2/api',
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  
  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  
  // Cache Configuration
  cache: {
    ttl: {
      transactions: 60, // 1 minute
      tokens: 300, // 5 minutes
    },
  },
} as const;

// Validate required environment variables
export const validateConfig = (): void => {
  const requiredVars = ['ETHERSCAN_API_KEY'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
};
