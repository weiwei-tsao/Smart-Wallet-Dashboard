import React from 'react';
import { Transaction } from '@/types/transaction';
import TransactionItem from './TransactionItem';
import { LoadingSpinner } from '@/components/ui';

interface TransactionListProps {
  transactions: Transaction[];
  currentAddress: string;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  currentAddress,
  isLoading,
  error,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-center py-8'>
          <LoadingSpinner size='lg' />
          <span className='ml-3 text-gray-600'>Loading transactions...</span>
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
          Failed to load transactions
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

  if (transactions.length === 0) {
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
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No transactions found
        </h3>
        <p className='text-gray-500'>
          This address has no transaction history yet.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Transaction History ({transactions.length})
        </h3>
        <div className='text-sm text-gray-500'>Latest transactions first</div>
      </div>

      <div className='space-y-3'>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.hash}
            transaction={transaction}
            currentAddress={currentAddress}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
