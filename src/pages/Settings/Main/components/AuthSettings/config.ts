import { NOTIFICATIONS } from "consts/notifications";

export enum Field {
  AllowAccountActivation = "allowAccountActivation",
  AllowWaitingList = "isWaitList",
  RequireInvitation = "requireInvitation",
  AllowCoupons = "isCoupon",
  AllowMenuItemsGrid = "allowMenuItemsGrid",
}

export const notificationMessage = {
  [Field.AllowAccountActivation]: NOTIFICATIONS.FRIENDS_CODE_SHARING_UPDATED,
  [Field.AllowWaitingList]: NOTIFICATIONS.IS_WAITING_LIST_UPDATED,
  [Field.RequireInvitation]: NOTIFICATIONS.ACCESS_APP_INVITATION_UPDATED,
  [Field.AllowCoupons]: NOTIFICATIONS.IS_COUPONS_UPDATED,
  [Field.AllowMenuItemsGrid]: NOTIFICATIONS.IS_MENU_ITEMS_GRID_UPDATED,
};

export type StateValues = {
  [Field.AllowAccountActivation]: undefined | boolean;
  [Field.AllowWaitingList]: undefined | boolean;
  [Field.RequireInvitation]: undefined | boolean;
  [Field.AllowCoupons]: undefined | boolean;
  [Field.AllowMenuItemsGrid]: undefined | boolean;
};

export const initialState: StateValues = {
  [Field.AllowAccountActivation]: undefined,
  [Field.AllowWaitingList]: undefined,
  [Field.RequireInvitation]: undefined,
  [Field.AllowCoupons]: undefined,
  [Field.AllowMenuItemsGrid]: undefined,
};

export type LoadingStateValues = Record<keyof StateValues, boolean>;

export const initialLoadingState: LoadingStateValues = {
  [Field.AllowAccountActivation]: false,
  [Field.AllowWaitingList]: false,
  [Field.RequireInvitation]: false,
  [Field.AllowCoupons]: false,
  [Field.AllowMenuItemsGrid]: false,
};

export type ConfirmModalType = {
  key: Field;
  value: boolean | number;
};
