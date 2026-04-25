export interface DownloadInfo {
  sessionId: string;
  customerEmail: string;
  downloadUrl: string;
  originalDownloadUrl: string;
  urlType: string;
  expiresAt: string | null;
  isExpired: boolean;
  createdAt: string;
  orderId: string;
  amount: number;
  currency: string;
  hasActiveToken: boolean;
  tokenInfo: {
    token: string;
    expiresAt: string;
    isExpired: boolean;
  } | null;
}

export interface TokenInfo {
  token: string;
  expiresAt: string;
  sessionId: string;
  isExpired: boolean;
}
