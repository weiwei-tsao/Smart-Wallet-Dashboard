export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string; // Etherscan returns as string
  isError: string; // Etherscan returns as "0" or "1"
  gasUsed: string;
  gasPrice: string;
  blockNumber: string;
  blockHash: string;
  nonce: string;
  transactionIndex: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  txreceipt_status: string;
  confirmations: string;
}

export interface TransactionListResponse {
  status: string;
  message: string;
  result: Transaction[];
}
