// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetScheduleOrdersSettingsQuery,
  useUpdateScheduleOrdersSettingsMutation,
} from "redux/query/ordersAPI";
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
  ScheduleOrder,
  StateValues,
} from "./config";

export const ScheduleOrdersSettings: FC = () => {
  const { openNotification } = useNotification();

  const { canScheduleOrderSettingsUpdate } = usePermissions();

  const [get] = useLazyGetScheduleOrdersSettingsQuery();
  const [update] = useUpdateScheduleOrdersSettingsMutation();

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

        [ScheduleOrder.IsScheduleOrders]: true,
        [ScheduleOrder.OrderCancelTime]: true,
        [ScheduleOrder.ScheduleOrderTime]: true,
      }));

      const data = await get().unwrap();

      setSettings(prev => ({ ...prev, ...data }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading({
        [ScheduleOrder.IsScheduleOrders]: false,
        [ScheduleOrder.OrderCancelTime]: false,
        [ScheduleOrder.ScheduleOrderTime]: false,
      });
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleUpdateSettings = async (
    key: ScheduleOrder,
    value: boolean | number,
  ) => {
    const isValueNumber = typeof value === "number";

    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      const payload = {
        [ScheduleOrder.IsScheduleOrders]:
          settings[ScheduleOrder.IsScheduleOrders],
        [ScheduleOrder.OrderCancelTime]:
          settings[ScheduleOrder.OrderCancelTime],
        [ScheduleOrder.ScheduleOrderTime]:
          settings[ScheduleOrder.ScheduleOrderTime],
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

  const handleUpdate = (
    key: ScheduleOrder,
    value: StateValues[ScheduleOrder],
  ) => {
    switch (key) {
      case ScheduleOrder.IsScheduleOrders:
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
      case ScheduleOrder.IsScheduleOrders:
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
    <>
      <ContentBox $column $gap={12}>
        <Typography.H2>Orders Schedule</Typography.H2>

        <div>
          <SettingsItem title="Enable order schedule">
            <Switch
              isLoading={isLoading[ScheduleOrder.IsScheduleOrders]}
              canUpdate={canScheduleOrderSettingsUpdate}
              data={settings[ScheduleOrder.IsScheduleOrders]}
              onChange={value =>
                handleUpdate(ScheduleOrder.IsScheduleOrders, value)
              }
            />
          </SettingsItem>

          <SettingsItem
            title="Minimum order rejection time (minutes)"
            description="Set a minimum order rejection time before starting order preparation for scheduled orders"
          >
            <Input
              suffix="minutes"
              step={1}
              isLoading={isLoading[ScheduleOrder.OrderCancelTime]}
              canUpdate={canScheduleOrderSettingsUpdate}
              data={settings[ScheduleOrder.OrderCancelTime]}
              onSubmit={value =>
                handleUpdateSettings(ScheduleOrder.OrderCancelTime, value)
              }
            />
          </SettingsItem>

          <SettingsItem
            title="Maximum available order time (days)"
            description="Set the maximum number of days for scheduled orders"
          >
            <Input
              suffix="days"
              step={1}
              isLoading={isLoading[ScheduleOrder.ScheduleOrderTime]}
              canUpdate={canScheduleOrderSettingsUpdate}
              data={settings[ScheduleOrder.ScheduleOrderTime]}
              onSubmit={value =>
                handleUpdateSettings(ScheduleOrder.ScheduleOrderTime, value)
              }
            />
          </SettingsItem>
        </div>
      </ContentBox>

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
    </>
  );
};
