import React from 'react';
import { SUPPORTED_NETWORKS } from '@/constants/networks';

interface NetworkSwitcherProps {
  currentChainId: number;
  onSwitchNetwork: (chainId: number) => void;
  isLoading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

export const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({
  currentChainId,
  onSwitchNetwork,
  isLoading = false,
  error = null,
  onClearError,
}) => {
  const networks = Object.values(SUPPORTED_NETWORKS);

  return (
    <div className='space-y-2'>
      <p className='text-sm text-gray-600'>Switch Network</p>
      {error && (
        <div className='p-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded flex justify-between items-center'>
          <span>{error}</span>
          {onClearError && (
            <button
              onClick={onClearError}
              className='ml-2 text-red-400 hover:text-red-600'
            >
              ✕
            </button>
          )}
        </div>
      )}
      <div className='flex flex-wrap gap-2'>
        {networks.map((network) => (
          <button
            key={network.chainId}
            onClick={() => onSwitchNetwork(network.chainId)}
            disabled={isLoading || currentChainId === network.chainId}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              currentChainId === network.chainId
                ? 'bg-blue-100 border-blue-300 text-blue-700'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            } ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isLoading ? 'Switching...' : network.name}
          </button>
        ))}
      </div>
    </div>
  );
};
