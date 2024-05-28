export enum PaymentStatus {
  Pending = "pending",
  Approved = "approved",
  Declined = "declined",
  Captured = "captured",
  Voided = "voided",
  Expired = "expired",
  Canceled = "canceled",
  Refund = "refund",
}

export type PaymentMeta = {
  appEnv: string;
  customerId: string;
  exchangeRate: number;
  fmcCentsAmount: number;
  referenceNo: string;
  type: string;
};

export type PaymentResponseDto = {
  id: string;
  customerId: string;
  status: PaymentStatus;
  amount: number | null;
  currency: string;
  expiresAt: string | null;
  metadata: PaymentMeta;
};
