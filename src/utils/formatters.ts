import { formatUnits } from 'ethers';

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
export const formatEther = (wei: string | number): string => {
  try {
    // 如果输入已经是 ETH 格式（包含小数点），直接返回
    if (typeof wei === 'string' && wei.includes('.')) {
      return wei;
    }

    // 确保输入是有效的 wei 字符串
    const weiString = typeof wei === 'number' ? wei.toString() : wei;

    // 检查是否为空或无效值
    if (!weiString || weiString === '0' || weiString === '0.0') {
      return '0';
    }

    // 确保是有效的数字字符串
    if (!/^\d+$/.test(weiString)) {
      console.warn('Invalid wei value:', weiString);
      return '0';
    }

    return formatUnits(weiString, 18);
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
  decimals: string | number
): string => {
  try {
    const decimalNumber =
      typeof decimals === 'string' ? parseInt(decimals) : decimals;
    return formatUnits(balance, decimalNumber);
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
