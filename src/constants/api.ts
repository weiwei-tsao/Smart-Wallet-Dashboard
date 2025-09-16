export const ETHERSCAN_API = {
  BASE_URL: 'https://api.etherscan.io/api',
  ENDPOINTS: {
    TRANSACTIONS: 'txlist',
    TOKEN_BALANCES: 'tokenlist',
  },
} as const;

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
