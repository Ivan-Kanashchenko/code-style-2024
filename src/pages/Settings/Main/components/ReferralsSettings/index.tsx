// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetReferralsSettingsQuery,
  useUpdateReferralsSettingsMutation,
} from "redux/query/referralsAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Helpers
import { getConfirmModalTitle } from "../../helpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import { PersonIcon } from "icons";
// Layouts
// Components
import { ConfirmDialog } from "components/Modals";
import SettingsItem from "../SettingsItem";
import { Switch } from "../Switch";
import { Input } from "../Input";
// Styled
import { ContentBox } from "styled/Box";
import { Typography } from "styled/Typography";

import {
  ConfirmReferralModalType,
  initialLoadingState,
  initialState,
  LoadingStateValues,
  notificationMessage,
  Referral,
  StateValues,
} from "./config";

export const ReferralsSettings: FC = () => {
  const { openNotification } = useNotification();

  const { canReferralsSettingsUpdate } = usePermissions();

  const [get] = useLazyGetReferralsSettingsQuery();
  const [update] = useUpdateReferralsSettingsMutation();

  const [settings, setSettings] = useState<StateValues>(initialState);

  const [isLoading, setIsLoading] =
    useState<LoadingStateValues>(initialLoadingState);

  const [confirmModal, setConfirmModal] = useState<
    ConfirmReferralModalType | false
  >(false);

  const getSettings = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,

        [Referral.BonusForInvitee]: true,
        [Referral.BonusForInviter]: true,
        [Referral.IsReferralBonus]: true,
      }));

      const data = await get().unwrap();

      setSettings(prev => ({ ...prev, ...data }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [Referral.BonusForInvitee]: false,
        [Referral.BonusForInviter]: false,
        [Referral.IsReferralBonus]: false,
      }));
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleUpdateSettings = async (
    key: Referral,
    value: boolean | number,
  ) => {
    const isValueNumber = typeof value === "number";

    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      const payload = {
        bonusForInviter: settings[Referral.BonusForInviter],
        bonusForInvitee: settings[Referral.BonusForInvitee],
        isReferralBonus: settings[Referral.IsReferralBonus],
        [key]: value,
      };

      if (isValueNumber) {
        await update(payload).unwrap();

        setSettings(prev => ({ ...prev, [key]: value }));
      } else {
        setSettings(prev => ({ ...prev, [key]: value }));

        await update(payload).unwrap();
      }

      openNotification({ message: notificationMessage[key] });
    } catch (error) {
      if (!isValueNumber) {
        setSettings(prev => ({ ...prev, [key]: !value }));
      }

      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));

      if (confirmModal) {
        setConfirmModal(false);
      }
    }
  };

  const handleUpdate = (key: Referral, value: StateValues[Referral]) => {
    switch (key) {
      case Referral.IsReferralBonus:
        setSettings(prev => ({ ...prev, [key]: value as boolean }));
        setConfirmModal({ key, value });
        return;

      default:
        break;
    }
  };

  const onConfirm = () => {
    if (!confirmModal) return;

    switch (confirmModal.key) {
      case Referral.IsReferralBonus:
        handleUpdateSettings(confirmModal.key, confirmModal.value as boolean);
        return;

      default:
        break;
    }
  };

  const onCancel = () => {
    if (!confirmModal) return;

    setSettings(prev => ({ ...prev, [confirmModal.key]: !confirmModal.value }));

    setConfirmModal(false);
  };

  return (
    <ContentBox $column $gap={12}>
      <Typography.H2>Referral Links</Typography.H2>

      <div>
        <SettingsItem title="Enable referral links">
          <Switch
            isLoading={isLoading[Referral.IsReferralBonus]}
            canUpdate={canReferralsSettingsUpdate}
            data={settings[Referral.IsReferralBonus]}
            onChange={value => handleUpdate(Referral.IsReferralBonus, value)}
          />
        </SettingsItem>

        <SettingsItem
          title="Referrer bonus (FM Coins)"
          description="Set the bonus for users who attract other users through a referral link"
        >
          <Input
            suffix="FM Coins"
            fixedDigitsPlaceholder={3}
            step={0.001}
            isLoading={isLoading[Referral.BonusForInviter]}
            canUpdate={canReferralsSettingsUpdate}
            data={settings[Referral.BonusForInviter]}
            onSubmit={value =>
              handleUpdateSettings(Referral.BonusForInviter, value)
            }
          />
        </SettingsItem>

        <SettingsItem
          title="Referral bonus (FM Coins)"
          description="Set the bonus for users who were attracted by a referral link"
        >
          <Input
            suffix="FM Coins"
            fixedDigitsPlaceholder={3}
            step={0.001}
            isLoading={isLoading[Referral.BonusForInvitee]}
            canUpdate={canReferralsSettingsUpdate}
            data={settings[Referral.BonusForInvitee]}
            onSubmit={value =>
              handleUpdateSettings(Referral.BonusForInvitee, value)
            }
          />
        </SettingsItem>
      </div>

      <ConfirmDialog
        isLoading={confirmModal && isLoading[confirmModal.key]}
        open={!!confirmModal}
        Icon={PersonIcon}
        message={
          confirmModal &&
          getConfirmModalTitle({
            key: confirmModal.key,
            value: confirmModal.value,
          })
        }
        description="Are you sure to continue this action?"
        onCancel={onCancel}
        firstCTAButton={{
          title: "Accept",
          status: "danger",
          disabled: false,
          loading: confirmModal && isLoading[confirmModal.key],
          onClick: onConfirm,
        }}
      />
    </ContentBox>
  );
};
