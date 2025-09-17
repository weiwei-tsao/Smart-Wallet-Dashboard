import React from 'react';
import { Token } from '@/types/token';
import { formatAddress, formatTokenBalance } from '@/utils/formatters';

interface TokenItemProps {
  token: Token;
}

const TokenItem: React.FC<TokenItemProps> = ({ token }) => {
  const formatBalance = () => {
    if (token.balance === '0' || !token.balance) {
      return '0';
    }
    return formatTokenBalance(token.balance, token.tokenDecimal.toString());
  };

  const getTokenIcon = () => {
    // 常见代币的图标映射
    const tokenIcons: { [key: string]: string } = {
      'USDT': '💵',
      'USDC': '💵',
      'DAI': '🟡',
      'WETH': '🔷',
      'UNI': '🦄',
      'LINK': '🔗',
      'AAVE': '👻',
      'COMP': '🏛️',
      'MKR': '🏛️',
      'SNX': '⚡',
      'YFI': '💰',
      'CRV': '🌊',
      '1INCH': '1️⃣',
      'SUSHI': '🍣',
      'BAL': '⚖️',
    };

    return tokenIcons[token.tokenSymbol] || '🪙';
  };

  const isZeroBalance = () => {
    return token.balance === '0' || !token.balance;
  };

  return (
    <div className={`border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors ${
      isZeroBalance() ? 'opacity-50' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getTokenIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900 truncate">
                {token.tokenName}
              </h4>
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {token.tokenSymbol}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {formatAddress(token.contractAddress)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-semibold ${
            isZeroBalance() ? 'text-gray-400' : 'text-gray-900'
          }`}>
            {formatBalance()}
          </div>
          <div className="text-xs text-gray-500">
            Decimals: {token.tokenDecimal}
          </div>
        </div>
      </div>
      
      {!isZeroBalance() && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Contract Address:</span>
            <button
              onClick={() => navigator.clipboard.writeText(token.contractAddress)}
              className="font-mono text-xs text-blue-600 hover:text-blue-800 transition-colors"
              title="Click to copy"
            >
              {formatAddress(token.contractAddress)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenItem;
