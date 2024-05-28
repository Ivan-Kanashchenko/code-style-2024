import { Payment } from "./components/PaymentSettings/config";
import { Field } from "./components/AuthSettings/config";
import { Referral } from "./components/ReferralsSettings/config";
import { ScheduleOrder } from "./components/ScheduleOrdersSettings/config";

type ModalKey = Field | Payment | Referral | ScheduleOrder;

export const getConfirmModalTitle = ({
  key,
  value,
}: {
  key: ModalKey;
  value: boolean | number;
}): string => {
  switch (key) {
    case Field.AllowWaitingList:
      return value
        ? "All new unregistered users will see the waiting list-related screens on mobile, appear in the Waiting list with inactive status"
        : "All new users will appear immediately after signing up in the Users with active status, won't see any of the waiting list-related screens on mobile";

    case Field.AllowCoupons:
      return value ? "Coupons will be enabled" : "Coupons will be disabled";

    case Field.AllowMenuItemsGrid:
      return value
        ? "The menu in the mobile application will be displayed as a grid"
        : "The menu in the mobile application will be displayed as a list";

    case Payment.IsCashPayment:
      return value
        ? "Cash Payment will be enabled"
        : "Cash Payment will be disabled";

    case Referral.IsReferralBonus:
      return value
        ? "Referral Links will be enabled"
        : "Referral Links will be disabled";

    case ScheduleOrder.IsScheduleOrders:
      return value
        ? "Orders Schedule will be enabled"
        : "Orders Schedule will be disabled";

    default:
      return "";
  }
};
