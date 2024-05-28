import { NOTIFICATIONS } from "consts/notifications";

export enum Referral {
  IsReferralBonus = "isReferralBonus",
  BonusForInvitee = "bonusForInvitee",
  BonusForInviter = "bonusForInviter",
}

export type StateValues = {
  [Referral.IsReferralBonus]: undefined | boolean;
  [Referral.BonusForInvitee]: undefined | number;
  [Referral.BonusForInviter]: undefined | number;
};

export const initialState: StateValues = {
  [Referral.IsReferralBonus]: undefined,
  [Referral.BonusForInvitee]: undefined,
  [Referral.BonusForInviter]: undefined,
};

export type LoadingStateValues = Record<keyof StateValues, boolean>;

export const initialLoadingState: LoadingStateValues = {
  [Referral.IsReferralBonus]: false,
  [Referral.BonusForInvitee]: false,
  [Referral.BonusForInviter]: false,
};

export type ConfirmReferralModalType = {
  key: Referral;
  value: boolean | number;
};

export const notificationMessage = {
  [Referral.IsReferralBonus]: NOTIFICATIONS.IS_REFERRAL_BONUS,
  [Referral.BonusForInvitee]: NOTIFICATIONS.REFERRAL_BONUS,
  [Referral.BonusForInviter]: NOTIFICATIONS.REFERRER_BONUS,
};
