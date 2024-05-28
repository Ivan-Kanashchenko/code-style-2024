import { NOTIFICATIONS } from "consts/notifications";

export enum ScheduleOrder {
  IsScheduleOrders = "isScheduleOrders",
  OrderCancelTime = "orderCancelTime",
  ScheduleOrderTime = "scheduleOrderTime",
}

export type StateValues = {
  [ScheduleOrder.IsScheduleOrders]: undefined | boolean;
  [ScheduleOrder.OrderCancelTime]: undefined | number;
  [ScheduleOrder.ScheduleOrderTime]: undefined | number;
};

export const initialState: StateValues = {
  [ScheduleOrder.IsScheduleOrders]: undefined,
  [ScheduleOrder.OrderCancelTime]: undefined,
  [ScheduleOrder.ScheduleOrderTime]: undefined,
};

export type LoadingStateValues = Record<keyof StateValues, boolean>;

export const initialLoadingState: LoadingStateValues = {
  [ScheduleOrder.IsScheduleOrders]: false,
  [ScheduleOrder.OrderCancelTime]: false,
  [ScheduleOrder.ScheduleOrderTime]: false,
};

export type ConfirmReferralModalType = {
  key: ScheduleOrder;
  value: boolean | number;
};

export const notificationMessage = {
  [ScheduleOrder.IsScheduleOrders]: NOTIFICATIONS.IS_SCHEDULE_ORDERS,
  [ScheduleOrder.OrderCancelTime]: NOTIFICATIONS.SCHEDULE_ORDER_CANCEL_TIME,
  [ScheduleOrder.ScheduleOrderTime]: NOTIFICATIONS.SCHEDULE_ORDER_TIME,
};
