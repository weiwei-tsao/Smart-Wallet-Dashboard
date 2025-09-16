export interface Token {
  contractAddress: string;
  tokenName: string;
  tokenSymbol: string;
  balance: string;
  tokenDecimal: number;
  logo?: string;
}

export interface TokenListResponse {
  status: string;
  message: string;
  result: Token[];
}
