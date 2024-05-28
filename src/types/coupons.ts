import { AllPaymentTypes, OrderPaymentType } from "./orders";

export enum CouponType {
  GiftVoucher = "giftVoucher",
  DiscountCode = "discountCode",
}

export enum CouponTypeLabel {
  giftVoucher = "Gift Voucher",
  discountCode = "Discount Code",
}

export enum DiscountType {
  Percentage = "percentage",
  FiatCents = "fiatCents",
  FmcCents = "fmcCents",
}

export enum DiscountTypeLabel {
  percentage = "Percentage",
  fiatCents = "KWD",
  fmcCents = "FM Coins",
}

export enum CouponPaymentLabel {
  all = "All",
  fiatCents = "KWD",
  fmcCents = "FM Coins",
}

export type CouponAllowedUser = {
  id: string;
  email: string | null;
  phoneNumber: string | null;
  firstName?: string;
  lastName?: string;
  fullName?: string;
};

export type Coupon = {
  id: string;
  createdAt: string;
  updatedAt: string;
  discountOff: number;
  discountType: DiscountType;
  startDate: string;
  expiryDate: string;
  numberOfUses: number;
  couponCode: string;
  isActive: boolean;
  allowMultipleUsage: boolean;
  allowedUsers: CouponAllowedUser[];
  minimumOrderFiatCentsPrice: number;
  minimumOrderFmcCentsPrice: number;
  orderPaymentType: OrderPaymentType | AllPaymentTypes;
  couponType: CouponType;
};

export type CreateCouponRequestData = {
  discountOff: number;
  discountType: DiscountType;
  expiryDate: string;
  startDate: string;
  numberOfUses: number;
  allowedUsers: string[];
  allowMultipleUsage: boolean;
  isActive: boolean;
  minimumOrderFiatCentsPrice: number;
  minimumOrderFmcCentsPrice: number;
  orderPaymentType: OrderPaymentType | AllPaymentTypes;
};
