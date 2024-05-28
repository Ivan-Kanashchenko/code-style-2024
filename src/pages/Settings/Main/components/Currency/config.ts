import { NOTIFICATIONS } from "consts/notifications";

export enum CurrencyField {
  ExchangeRateValue = "exchangeRateValue",
  BalanceExpirationDays = "balanceExpirationDays",
}

export const notificationMessage = {
  [CurrencyField.ExchangeRateValue]: NOTIFICATIONS.EXCHANGE_RATE_UPDATED,
  [CurrencyField.BalanceExpirationDays]:
    NOTIFICATIONS.BALANCE_EXPIRATION_DAYS_UPDATED,
};

export type StateValues = {
  [CurrencyField.BalanceExpirationDays]: undefined | number;
  [CurrencyField.ExchangeRateValue]: undefined | number;
};

export const initialState: StateValues = {
  [CurrencyField.BalanceExpirationDays]: undefined,
  [CurrencyField.ExchangeRateValue]: undefined,
};

export type LoadingStateValues = Record<keyof StateValues, boolean>;

export const initialLoadingState: LoadingStateValues = {
  [CurrencyField.BalanceExpirationDays]: false,
  [CurrencyField.ExchangeRateValue]: false,
};
