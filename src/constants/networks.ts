export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  // MetaMask 网络配置
  metamaskConfig: {
    chainId: string;
    chainName: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}

export const SUPPORTED_NETWORKS: Record<string, NetworkConfig> = {
  mainnet: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    metamaskConfig: {
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      rpcUrls: ['https://mainnet.infura.io/v3/'],
      blockExplorerUrls: ['https://etherscan.io'],
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
    },
  },
  // Goerli 已弃用，推荐使用 Sepolia
  // goerli: {
  //   chainId: 5,
  //   name: 'Goerli Testnet (Deprecated)',
  //   rpcUrl: 'https://goerli.infura.io/v3/',
  //   blockExplorer: 'https://goerli.etherscan.io',
  //   currency: {
  //     name: 'Goerli Ether',
  //     symbol: 'ETH',
  //     decimals: 18,
  //   },
  //   metamaskConfig: {
  //     chainId: '0x5',
  //     chainName: 'Goerli Testnet',
  //     rpcUrls: ['https://goerli.infura.io/v3/'],
  //     blockExplorerUrls: ['https://goerli.etherscan.io'],
  //     nativeCurrency: {
  //       name: 'Goerli Ether',
  //       symbol: 'ETH',
  //       decimals: 18,
  //     },
  //   },
  // },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    blockExplorer: 'https://sepolia.etherscan.io',
    currency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    metamaskConfig: {
      chainId: '0xaa36a7',
      chainName: 'Sepolia Testnet',
      rpcUrls: ['https://sepolia.infura.io/v3/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
      nativeCurrency: {
        name: 'Sepolia Ether',
        symbol: 'ETH',
        decimals: 18,
      },
    },
  },
};

export const DEFAULT_NETWORK = 'mainnet';
