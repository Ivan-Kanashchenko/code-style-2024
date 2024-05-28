import { NOTIFICATIONS } from "consts/notifications";

export enum Payment {
  Discount = "discount",
  MinimumOrder = "minimumOrder",
  DeliveryFeeFiatCents = "deliveryFeeFiatCents",
  DeliveryFeeFmcCents = "deliveryFeeFmcCents",
  IsCashPayment = "isCashPayment",
  MinimumOrderValue = "minimumOrderValue",
  MinimumTopUpValue = "minimumTopUpValue",
  AvailableLocations = "availableLocations",
}

export type StateValues = {
  [Payment.IsCashPayment]: undefined | boolean;
  [Payment.Discount]: undefined | number;
  [Payment.DeliveryFeeFiatCents]: undefined | number;
  [Payment.DeliveryFeeFmcCents]: undefined | number;
  [Payment.MinimumOrder]: undefined | number;
  [Payment.MinimumOrderValue]: undefined | number;
  [Payment.MinimumTopUpValue]: undefined | number;
  [Payment.AvailableLocations]: undefined | string[];
};

export const initialState: StateValues = {
  [Payment.IsCashPayment]: undefined,
  [Payment.Discount]: undefined,
  [Payment.DeliveryFeeFiatCents]: undefined,
  [Payment.DeliveryFeeFmcCents]: undefined,
  [Payment.MinimumOrder]: undefined,
  [Payment.MinimumOrderValue]: undefined,
  [Payment.MinimumTopUpValue]: undefined,
  [Payment.AvailableLocations]: undefined,
};

export type LoadingStateValues = Record<keyof StateValues, boolean>;

export const initialLoadingState: LoadingStateValues = {
  [Payment.IsCashPayment]: false,
  [Payment.Discount]: false,
  [Payment.DeliveryFeeFiatCents]: false,
  [Payment.DeliveryFeeFmcCents]: false,
  [Payment.MinimumOrder]: false,
  [Payment.MinimumOrderValue]: false,
  [Payment.MinimumTopUpValue]: false,
  [Payment.AvailableLocations]: false,
};

export type ConfirmCashPaymentModalType = {
  key: Payment;
  value: boolean | number;
};

export const notificationMessage = {
  [Payment.IsCashPayment]: NOTIFICATIONS.IS_CASH_PAYMENT,
  [Payment.Discount]: NOTIFICATIONS.PAYMENT_DISCOUNT,
  [Payment.DeliveryFeeFiatCents]: NOTIFICATIONS.PAYMENT_DELIVERY_FEE,
  [Payment.DeliveryFeeFmcCents]: NOTIFICATIONS.PAYMENT_DELIVERY_FEE,
  [Payment.MinimumOrder]: NOTIFICATIONS.PAYMENT_MINIMUM_ORDER,
  [Payment.MinimumOrderValue]: NOTIFICATIONS.MIN_ORDER_COINS_UPDATED,
  [Payment.MinimumTopUpValue]: NOTIFICATIONS.MIN_TOP_UP_UPDATED,
  [Payment.AvailableLocations]: NOTIFICATIONS.AVAILABLE_LOCATIONS,
};
