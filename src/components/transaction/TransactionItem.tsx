import React from 'react';
import { Transaction } from '@/types/transaction';
import {
  formatAddress,
  formatEther,
  formatTimestamp,
} from '@/utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  currentAddress: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  currentAddress,
}) => {
  const isIncoming =
    transaction.to.toLowerCase() === currentAddress.toLowerCase();
  const isOutgoing =
    transaction.from.toLowerCase() === currentAddress.toLowerCase();

  const getTransactionType = () => {
    if (isIncoming) return 'Received';
    if (isOutgoing) return 'Sent';
    return 'Contract';
  };

  const getTransactionIcon = () => {
    if (isIncoming) return '↗️';
    if (isOutgoing) return '↘️';
    return '📄';
  };

  const getAmountColor = () => {
    if (isIncoming) return 'text-green-600';
    if (isOutgoing) return 'text-red-600';
    return 'text-gray-600';
  };

  const getAmountPrefix = () => {
    if (isIncoming) return '+';
    if (isOutgoing) return '-';
    return '';
  };

  return (
    <div className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='text-2xl'>{getTransactionIcon()}</div>
          <div>
            <div className='flex items-center space-x-2'>
              <span className='font-medium text-gray-900'>
                {getTransactionType()}
              </span>
              {transaction.isError === '1' && (
                <span className='px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full'>
                  Failed
                </span>
              )}
            </div>
            <p className='text-sm text-gray-500'>
              {formatTimestamp(parseInt(transaction.timeStamp))}
            </p>
          </div>
        </div>
        <div className='text-right'>
          <div className={`font-semibold ${getAmountColor()}`}>
            {getAmountPrefix()}
            {formatEther(transaction.value)} ETH
          </div>
          <div className='text-xs text-gray-500'>
            Gas: {transaction.gasUsed}
          </div>
        </div>
      </div>

      <div className='mt-3 pt-3 border-t border-gray-100'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
          <div>
            <span className='text-gray-500'>From:</span>
            <p className='font-mono text-xs break-all'>
              {formatAddress(transaction.from)}
            </p>
          </div>
          <div>
            <span className='text-gray-500'>To:</span>
            <p className='font-mono text-xs break-all'>
              {formatAddress(transaction.to)}
            </p>
          </div>
        </div>

        <div className='mt-2'>
          <span className='text-gray-500 text-sm'>Hash:</span>
          <p className='font-mono text-xs break-all text-blue-600'>
            {transaction.hash}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
