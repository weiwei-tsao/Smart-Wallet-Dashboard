export interface ApiResponse<T> {
  status: string;
  message: string;
  result: T;
}

export interface EtherscanConfig {
  apiKey: string;
  baseUrl: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
