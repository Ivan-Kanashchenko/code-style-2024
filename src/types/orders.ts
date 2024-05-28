import { Coupon } from "./coupons";

export enum OrderType {
  INSTANT_ORDER = "instantOrder",
  SCHEDULE_ORDER = "scheduleOrder",
  SCHEDULE_COLD_ORDER = "scheduleColdOrder",
}

export enum OrderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  PREPARING = "preparing",
  PREPARED = "prepared",
  READY_FOR_PICKUP = "ready_for_pickup",
  IN_DELIVERY = "in_delivery",
  DELIVERED = "delivered",
  AUTO_FINALIZED = "auto_finalized",
  CANCELED = "canceled",
  SCHEDULED = "scheduled",
}

export enum OrderStatusLabel {
  pending = "New",
  accepted = "Accepted",
  preparing = "Preparing",
  prepared = "Prepared",
  ready_for_pickup = "Ready for pickup",
  in_delivery = "In delivery",
  delivered = "Delivered",
  auto_finalized = "Auto finalized",
  canceled = "Canceled",
  scheduled = "Scheduled",
}

export enum ChargeStatus {
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
  REFUND_REQUESTED = "refund_requested",
  REFUND_SUCCEEDED = "refund_succeeded",
  REFUND_FAILED = "refund_failed",
  UNPAID = "unpaid",
}

export enum ChargeStatusLabel {
  pending = "Pending",
  succeeded = "Succeeded",
  failed = "Failed",
  refund_requested = "Refund requested",
  refund_succeeded = "Refund succeeded",
  refund_failed = "Refund failed",
  unpaid = "Unpaid",
}

export enum ChargeFailureReasonLabel {
  insufficient_funds = "insufficient funds",
  expired_balance = "expired balance",
  refund_failed = "refund_failed",
  internal_error = "internal_error",
}

export enum EOrderTypeValue {
  PICK_UP = "1",
  DELIVERY = "2",
  EAT_IN = "3",
}

export enum EOrderTypeLabel {
  PICK_UP = "Pick Up",
  DELIVERY = "Delivery",
  EAT_IN = "Eat In",
}

export enum EPaymentMethod {
  CARD = "Card",
  CASH = "Cash",
}

export interface OrderStatusHistoryItem {
  previousStatus: string | null;
  newStatus: "pending" | string;
  timestamp: string;
}

export interface OrderParams {
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortingOrder?: string;
}

export enum OrderFilterTypes {
  createdAfter = "createdAtAfter",
  updatedAfter = "updatedAtAfter",
  sidLike = "sidLike",
  phoneNumber = "phoneNumber",
  orderStatus = "orderStatus",
  chargeStatus = "chargeStatus",
}

export enum OrderFilterNames {
  createdAtAfter = "Created after",
  updatedAtAfter = "Updated after",
  sidLike = "Order ID",
  phoneNumber = "Phone number",
  orderStatus = "Order status",
  chargeStatus = "Charge status",
}

export type OrderStatusDto =
  | "pending"
  | "accepted"
  | "preparing"
  | "prepared"
  | "ready_for_pickup"
  | "in_delivery"
  | "delivered"
  | "auto_finalized"
  | "canceled";

export type ChargeStatusDto =
  | "pending"
  | "succeeded"
  | "failed"
  | "refund_requested"
  | "refund_succeeded"
  | "refund_failed"
  | "unpaid";

export type ChargeFailureReasonDto =
  | "insufficient_funds"
  | "expired_balance"
  | "refund_failed"
  | "internal_error"
  | null;

export type CustomerAddressResponseDto = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  city: string;
  area: string;
  block: string;
  street: string;
  building: string;
  floor: string | null;
  flat: string | null;
  phone: string;
  additionalInfo: string | null;
  isSelected: boolean;
  isInAnyDeliveryZone?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddonsModifiers = {
  productId: string;
  productPLU: string;
  productName: string;
  productDescription: string;
  productCalories: number;
  quantity: number;
  fmcCentsPrice: number;
  fiatCentsPrice: number;
};

export type OrderItemResponseDto = {
  productId: string;
  productPLU: string;
  productName: string;
  quantity: number;
  fmcCentsPrice: number;
  fiatCentsPrice: number;
  remark: string;
  subItems: AddonsModifiers[];
};

export type DeliveryResponseDto = {
  id: string;
  customerId: string;
  locationId: string;
  deliveryFeeFiatCents: number;
  deliveryFeeFmcCents: number;
  deliveryAddress: CustomerAddressResponseDto;
  deliverectValidationId: string | null;
  deliveryProvider: "deliverect" | "own";
  expiresAt: string;
  estimatedDeliveryTime: string | null;
  estimatedDeliveryTimeEnd: string | null;
  orderId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatusHistoryItemResponseDto = {
  previousStatus: OrderStatusDto | null;
  newStatus: OrderStatusDto;
  timestamp: string;
};

export enum AllPaymentTypes {
  All = "all",
}

export enum OrderPaymentType {
  FiatCents = "fiatCents",
  FmcCents = "fmcCents",
}

export enum OrderPaymentTypeLabel {
  fiatCents = "KWD",
  fmcCents = "Coin",
}

export type OrderResponseDto = {
  paymentType: OrderPaymentType;
  id: string;
  sid: string;
  menuId: string;
  locationId: string;
  locationName: string | null;
  deliveryId: string;
  customerId: string;
  firstName: string | null;
  lastName: string | null;
  fullName?: string | null;
  phoneNumber: string | null;
  delivery: DeliveryResponseDto;
  items: OrderItemResponseDto[];
  totalFiatCentsPrice: number;
  totalFmcCentsPrice: number;
  orderStatus: OrderStatusDto;
  chargeStatus: ChargeStatusDto;
  coupons: Coupon[];
  chargeFailureReason: ChargeFailureReasonDto;
  orderStatusHistory: OrderStatusHistoryItemResponseDto[];
  chargeStatusHistory: OrderStatusHistoryItemResponseDto[];
  timeslot: string;
  createdAt: string;
  updatedAt: string;
};

export type GetOrdersResponseDto = {
  totalCount: number;
  items: OrderResponseDto[];
};

export type ScheduleOrdersSettingsDto = {
  isScheduleOrders: boolean;
  orderCancelTime: number;
  scheduleOrderTime: number;
};

export type UserDeliveryAddressForm = {
  id: string;
  name: string;
  city: string;
  area: string;
  block: string;
  street: string;
  building: string;
  floor: string;
  flat: string;
  phoneCode: string;
  phone: string;
  additionalInfo: string;
  isSelected?: boolean;
};

export type CreateOrderDeliveryManualRequestDto = {
  customerId: string;
  locationId: string;
  deliveryProvider: string;
  address: {
    street: string;
    area: string;
    block: string;
    building: string;
    city: string;
    phoneNumber: string;
    lng?: number;
    lat?: number;
  };
};

export type CreateOrderDeliveryManualResponseDto = {
  id: string;
  customerId: string;
  locationId: string;
  deliveryFeeFiatCents: number;
  deliveryFeeFmcCents: number;
  deliveryAddress: {
    id: string;
    name: string;
    lng: number;
    lat: number;
    city: string;
    area: string;
    block: string;
    street: string;
    building: string;
    floor: string;
    flat: string;
    phone: string;
    additionalInfo: string;
    isSelected: boolean;
    isInAnyDeliveryZone: boolean;
    createdAt: string;
    updatedAt: string;
  };
  deliverectValidationId: string;
  deliveryProvider: string;
  expiresAt: string;
  estimatedDeliveryTime: string;
  estimatedDeliveryTimeEnd: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderRequestDto = {
  customerId?: string;
  menuId: string;
  items: {
    productId: string;
    quantity: number;
    fmcCentsPrice: number;
    remark?: string;
    subItems: {
      productId: string;
      quantity: number;
      fmcCentsPrice: number;
      remark?: string;
    }[];
  }[];
  totalFmcCentsPrice: number;
  totalFiatCentsPrice: number;
  deliveryId: string;
  expectedPreorderDeliveryTime?: string;
  expectedPreorderDeliveryTimeEnd?: string;
  cutlery: boolean;
  timeslot?: string;
  deliveryFeeFmcCentsPrice: number;
  deliveryFeeFiatCentsPrice: number;
  paymentType: OrderPaymentType;
  type: OrderType;
  couponIds: string[];
};

export type CreateOrderResponseDto = {
  id: string;
  sid: string;
  coupons: {
    id: string;
    createdAt: string;
    updatedAt: string;
    discountOff: number;
    discountType: string;
    expiryDate: string;
    startDate: string;
    orderPaymentType: string;
    numberOfUses: 0;
    minimumOrderFiatCentsPrice: number;
    minimumOrderFmcCentsPrice: number;
    couponCode: string;
    couponType: string;
    isActive: boolean;
    allowMultipleUsage: boolean;
    allowedUsers: {
      id: string;
      phoneNumber: string;
      firstName: string;
      lastName: string;
      email: string;
    }[];
  };
  menuId: string;
  locationId: string;
  locationName: string;
  deliveryId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  paymentType: string;
  type: string;
  customerId: string;
  delivery: {
    id: string;
    customerId: string;
    locationId: string;
    deliveryFeeFiatCents: number;
    deliveryFeeFmcCents: number;
    deliveryAddress: {
      id: string;
      name: string;
      lng: number;
      lat: number;
      city: string;
      area: string;
      block: string;
      street: string;
      building: string;
      floor: string;
      flat: string;
      phone: string;
      additionalInfo: string;
      isSelected: boolean;
      isInAnyDeliveryZone: boolean;
      createdAt: string;
      updatedAt: string;
    };
    deliverectValidationId: string;
    deliveryProvider: string;
    expiresAt: string;
    estimatedDeliveryTime: string;
    estimatedDeliveryTimeEnd: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
  };
  items: {
    productId: string;
    productPLU: string;
    productDescription: string;
    productName: string;
    imageURL: string;
    productCalories: string;
    quantity: number;
    fmcCentsPrice: number;
    fiatCentsPrice: number;
    remark: string;
    subItems: {
      productId: string;
      productPLU: string;
      productName: string;
      productDescription: string;
      productCalories: number;
      quantity: number;
      fmcCentsPrice: number;
      fiatCentsPrice: number;
    }[];
  }[];
  totalFiatCentsPrice: number;
  totalFmcCentsPrice: number;
  orderStatus: string;
  chargeStatus: string;
  chargeFailureReason: string;
  orderStatusHistory: {
    previousStatus: string;
    newStatus: string;
    timestamp: string;
  }[];
  chargeStatusHistory: {
    previousStatus: string;
    newStatus: string;
    timestamp: string;
  }[];
  cutlery: boolean;
  hasRating: boolean;
  timeslot: string;
  createdAt: string;
  updatedAt: string;
};
