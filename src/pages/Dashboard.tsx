import React from 'react';
import { Card, Button, LoadingSpinner } from '@/components/ui';
import { useWallet } from '@/hooks/useWallet';
import { formatAddress, formatEther } from '@/utils/formatters';

const Dashboard: React.FC = () => {
  const {
    isConnected,
    address,
    balance,
    network,
    isLoading,
    error,
    connect,
    disconnect,
  } = useWallet();

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <LoadingSpinner size='lg' className='mx-auto mb-4' />
          <p className='text-gray-600'>Connecting to wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Smart Wallet Dashboard
            </h1>
            <p className='text-gray-600'>
              Connect your MetaMask wallet to view your balance, transaction
              history, and token holdings.
            </p>
          </div>

          {!isConnected ? (
            <Card className='text-center'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                Connect Your Wallet
              </h2>
              <p className='text-gray-600 mb-6'>
                Click the button below to connect your MetaMask wallet and start
                exploring your Web3 portfolio.
              </p>
              <Button onClick={handleConnect} size='lg'>
                Connect MetaMask
              </Button>
              {error && (
                <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
                  <p className='text-red-600'>{error}</p>
                </div>
              )}
            </Card>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Card title='Wallet Address'>
                <div className='space-y-2'>
                  <p className='text-sm text-gray-600'>Address</p>
                  <p className='font-mono text-sm bg-gray-100 p-2 rounded'>
                    {formatAddress(address!)}
                  </p>
                </div>
              </Card>

              <Card title='Balance'>
                <div className='space-y-2'>
                  <p className='text-sm text-gray-600'>ETH Balance</p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {formatEther(balance!)} ETH
                  </p>
                </div>
              </Card>

              <Card title='Network'>
                <div className='space-y-2'>
                  <p className='text-sm text-gray-600'>Current Network</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {network?.name || 'Unknown'}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Chain ID: {network?.chainId}
                  </p>
                </div>
              </Card>

              <div className='md:col-span-2 lg:col-span-3'>
                <Card>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        Wallet Connected
                      </h3>
                      <p className='text-gray-600'>
                        Your wallet is successfully connected and ready to use.
                      </p>
                    </div>
                    <Button variant='danger' onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
