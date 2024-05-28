import { NOTIFICATIONS } from "consts/notifications";

export enum MinimumValuesField {
  MinimumOrderValue = "minimumOrderValue",
  MinimumTopUpValue = "minimumTopUpValue",
}

export const notificationMessage = {
  [MinimumValuesField.MinimumOrderValue]: NOTIFICATIONS.MIN_ORDER_COINS_UPDATED,
  [MinimumValuesField.MinimumTopUpValue]: NOTIFICATIONS.MIN_TOP_UP_UPDATED,
};

export type StateValues = {
  [MinimumValuesField.MinimumOrderValue]: undefined | number;
  [MinimumValuesField.MinimumTopUpValue]: undefined | number;
};

export const initialState: StateValues = {
  [MinimumValuesField.MinimumOrderValue]: undefined,
  [MinimumValuesField.MinimumTopUpValue]: undefined,
};

export type LoadingStateValues = Record<keyof StateValues, boolean>;

export const initialLoadingState: LoadingStateValues = {
  [MinimumValuesField.MinimumOrderValue]: false,
  [MinimumValuesField.MinimumTopUpValue]: false,
};

export type ConfirmModalType = {
  key: MinimumValuesField;
  value: boolean | number;
};
