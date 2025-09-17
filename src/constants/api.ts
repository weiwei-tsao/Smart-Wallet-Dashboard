// Etherscan V2 API - 统一多链支持
export const ETHERSCAN_V2_API = {
  BASE_URL: 'https://api.etherscan.io/v2/api',
  ENDPOINTS: {
    TRANSACTIONS: 'txlist',
    TOKEN_BALANCES: 'tokenbalance',
    BALANCE: 'balance',
  },
} as const;

// 支持的链ID映射
export const SUPPORTED_CHAIN_IDS = {
  ETHEREUM_MAINNET: 1,
  GOERLI: 5,
  SEPOLIA: 11155111,
  BSC: 56,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  AVALANCHE: 43114,
} as const;

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
