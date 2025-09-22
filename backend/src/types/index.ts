// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Transaction Types
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  blockNumber: string;
  gasUsed: string;
  gasPrice: string;
  isError: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

// Token Types
export interface Token {
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  balanceFormatted: string;
  price?: number;
  valueUSD?: number;
}

export interface TokenListResponse {
  tokens: Token[];
  total: number;
}

// Favorite Types
export interface Favorite {
  id: string;
  address: string;
  alias?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFavoriteRequest {
  address: string;
  alias?: string | null;
}

// Etherscan API Types
export interface EtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

export interface EtherscanTokenBalance {
  account: string;
  balance: string;
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
}

export interface EtherscanApiResponse<T> {
  status: string;
  message: string;
  result: T;
}

// Cache Types
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  key: string;
}

// Error Types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
