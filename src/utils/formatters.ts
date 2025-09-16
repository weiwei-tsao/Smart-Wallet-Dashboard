import { ethers } from 'ethers';

/**
 * Format wallet address to show first 6 and last 4 characters
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Format ETH balance from wei to ETH
 */
export const formatEther = (wei: string): string => {
  try {
    return ethers.formatEther(wei);
  } catch (error) {
    console.error('Error formatting ether:', error);
    return '0';
  }
};

/**
 * Format token balance with proper decimals
 */
export const formatTokenBalance = (
  balance: string,
  decimals: number
): string => {
  try {
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error('Error formatting token balance:', error);
    return '0';
  }
};

/**
 * Format timestamp to readable date
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

/**
 * Format transaction hash to show first 8 and last 6 characters
 */
export const formatTxHash = (hash: string): string => {
  if (!hash) return '';
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num: string | number): string => {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  return number.toLocaleString();
};
