import { ethers } from 'ethers';

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

/**
 * Validate transaction hash
 */
export const isValidTxHash = (hash: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
};

/**
 * Validate if MetaMask is installed
 */
export const isMetaMaskInstalled = (): boolean => {
  return (
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
  );
};

/**
 * Validate network chain ID
 */
export const isValidChainId = (chainId: number): boolean => {
  const supportedChainIds = [1, 5, 11155111]; // mainnet, goerli, sepolia
  return supportedChainIds.includes(chainId);
};

/**
 * Validate API key format
 */
export const isValidApiKey = (apiKey: string): boolean => {
  return apiKey && apiKey.length > 10 && /^[a-zA-Z0-9]+$/.test(apiKey);
};
