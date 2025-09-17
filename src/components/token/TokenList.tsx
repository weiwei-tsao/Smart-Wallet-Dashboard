import React from 'react';
import { Token } from '@/types/token';
import TokenItem from './TokenItem';
import { LoadingSpinner } from '@/components/ui';
import { formatTokenBalance } from '@/utils/formatters';

interface TokenListProps {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  isLoading,
  error,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-center py-8'>
          <LoadingSpinner size='lg' />
          <span className='ml-3 text-gray-600'>Loading tokens...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <div className='text-red-500 mb-4'>
          <svg
            className='mx-auto h-12 w-12'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Failed to load tokens
        </h3>
        <p className='text-gray-500 mb-4'>{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className='text-center py-8'>
        <div className='text-gray-400 mb-4'>
          <svg
            className='mx-auto h-12 w-12'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No tokens found
        </h3>
        <p className='text-gray-500'>
          This address has no ERC-20 token balances.
        </p>
      </div>
    );
  }

  // 过滤掉余额为0的代币，并按余额排序
  const tokensWithBalance = tokens
    .filter(token => token.balance !== '0' && token.balance)
    .sort((a, b) => {
      const balanceA = parseFloat(formatTokenBalance(a.balance, a.tokenDecimal.toString()));
      const balanceB = parseFloat(formatTokenBalance(b.balance, b.tokenDecimal.toString()));
      return balanceB - balanceA;
    });

  const zeroBalanceTokens = tokens.filter(token => token.balance === '0' || !token.balance);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Token Balances ({tokensWithBalance.length})
        </h3>
        <div className='text-sm text-gray-500'>
          {tokensWithBalance.length > 0 ? 'Sorted by balance' : 'No tokens with balance'}
        </div>
      </div>
      
      {tokensWithBalance.length > 0 && (
        <div className='space-y-3'>
          {tokensWithBalance.map((token) => (
            <TokenItem
              key={token.contractAddress}
              token={token}
            />
          ))}
        </div>
      )}

      {zeroBalanceTokens.length > 0 && (
        <div className='mt-6'>
          <h4 className='text-sm font-medium text-gray-500 mb-3'>
            Zero Balance Tokens ({zeroBalanceTokens.length})
          </h4>
          <div className='space-y-2'>
            {zeroBalanceTokens.slice(0, 5).map((token) => (
              <TokenItem
                key={token.contractAddress}
                token={token}
              />
            ))}
            {zeroBalanceTokens.length > 5 && (
              <div className='text-center py-2'>
                <span className='text-sm text-gray-400'>
                  And {zeroBalanceTokens.length - 5} more zero balance tokens...
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenList;
