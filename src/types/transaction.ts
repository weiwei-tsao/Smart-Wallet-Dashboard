export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  isError: boolean;
  gasUsed: string;
  gasPrice: string;
  blockNumber: string;
  blockHash: string;
}

export interface TransactionListResponse {
  status: string;
  message: string;
  result: Transaction[];
}
