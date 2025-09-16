export interface NetworkInfo {
  chainId: number;
  name: string;
  ensAddress?: string;
}

export interface WalletInfo {
  address: string;
  balance: string;
  network: NetworkInfo;
}

export interface WalletConnectionStatus {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}
