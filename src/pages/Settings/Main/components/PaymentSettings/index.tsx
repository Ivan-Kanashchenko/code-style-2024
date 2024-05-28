// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetCashPaymentsSettingsQuery,
  useUpdateCashPaymentsSettingsMutation,
} from "redux/query/cashPaymentsSettingsAPI";
import {
  useLazyGetSettingsQuery,
  useUpdateSettingsMutation,
} from "redux/query/settingsAPI";
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
import { Input } from "../Input";
import { Switch } from "../Switch";
import SettingsItem from "../SettingsItem";
// Styled
import { ContentBox, SubContentBox } from "styled/Box";
import { Typography } from "styled/Typography";

import {
  Payment,
  ConfirmCashPaymentModalType,
  initialLoadingState,
  initialState,
  LoadingStateValues,
  notificationMessage,
  StateValues,
} from "./config";
import { LocationsInput } from "../LocationsInput";
import { Title } from "./styled";

export const PaymentSettings: FC = () => {
  const { openNotification } = useNotification();

  const { canPaymentSettingsUpdate } = usePermissions();

  const [get] = useLazyGetCashPaymentsSettingsQuery();
  const [update] = useUpdateCashPaymentsSettingsMutation();
  const [fetchSettings] = useLazyGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  const [settings, setSettings] = useState<StateValues>(initialState);

  const [isLoading, setIsLoading] =
    useState<LoadingStateValues>(initialLoadingState);

  const [confirmModal, setConfirmModal] = useState<
    ConfirmCashPaymentModalType | false
  >(false);

  const [areasModal, setAreasModal] = useState(false);

  const getMinimunSettings = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [Payment.MinimumOrderValue]: true,
        [Payment.MinimumTopUpValue]: true,
      }));

      const { minimumOrderValue, minimumTopUpValue } =
        await fetchSettings().unwrap();

      setSettings(prev => ({ ...prev, minimumOrderValue, minimumTopUpValue }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [Payment.MinimumOrderValue]: false,
        [Payment.MinimumTopUpValue]: false,
      }));
    }
  };

  const getSettings = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [Payment.IsCashPayment]: true,
        [Payment.DeliveryFeeFiatCents]: true,
        [Payment.DeliveryFeeFmcCents]: true,
        [Payment.Discount]: true,
        [Payment.MinimumOrder]: true,
      }));

      const data = await get().unwrap();

      setSettings(prev => ({ ...prev, ...data }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [Payment.IsCashPayment]: false,
        [Payment.DeliveryFeeFiatCents]: false,
        [Payment.DeliveryFeeFmcCents]: false,
        [Payment.Discount]: false,
        [Payment.MinimumOrder]: false,
      }));
    }
  };

  useEffect(() => {
    getSettings();
    getMinimunSettings();
  }, []);

  const handleUpdateMinimumSettings = async (key: Payment, value: number) => {
    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      const payload = {
        minimumOrderValue: settings.minimumOrderValue,
        minimumTopUpValue: settings.minimumTopUpValue,
        [key]: value,
      };

      await updateSettings(payload).unwrap();

      setSettings(prev => ({ ...prev, [key]: value }));

      openNotification({ message: notificationMessage[key] });
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleUpdateSettings = async (
    key: Payment,
    value: boolean | number | string[],
  ) => {
    const isValueNumber = typeof value === "number";
    const isArray = Array.isArray(value);

    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      const payload = {
        deliveryFeeFiatCents: settings[Payment.DeliveryFeeFiatCents],
        discount: settings[Payment.Discount],
        isCashPayment: settings[Payment.IsCashPayment],
        minimumOrder: settings[Payment.MinimumOrder],
        deliveryFeeFmcCents: settings[Payment.DeliveryFeeFmcCents],
        availableLocations: settings[Payment.AvailableLocations],
        [key]: value,
      };

      if (isValueNumber || isArray) {
        await update(payload).unwrap();

        setSettings(prev => ({ ...prev, [key]: value }));

        if (areasModal) {
          setAreasModal(false);
        }
      } else {
        setSettings(prev => ({ ...prev, [key]: value }));

        await update(payload).unwrap();
      }

      openNotification({ message: notificationMessage[key] });
    } catch (error) {
      if (!isValueNumber || !isArray) {
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

  const handleUpdate = (key: Payment, value: StateValues[Payment]) => {
    switch (key) {
      case Payment.Discount:
      case Payment.DeliveryFeeFiatCents:
      case Payment.MinimumOrder:
      case Payment.DeliveryFeeFmcCents:
      case Payment.AvailableLocations:
        handleUpdateSettings(key, value as boolean | number | string[]);
        return;

      case Payment.IsCashPayment:
        setSettings(prev => ({ ...prev, [key]: value as boolean }));
        setConfirmModal({ key, value: value as boolean });
        return;

      default:
        break;
    }
  };

  const onConfirm = () => {
    if (!confirmModal) return;

    switch (confirmModal.key) {
      case Payment.IsCashPayment:
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

  const handleAreasModalOpen = () => {
    setAreasModal(true);
  };
  const handleAreasModalClose = () => {
    setAreasModal(false);
  };

  return (
    <>
      <ContentBox $column $gap={12} $padding="24px 12px 12px">
        <Title>Payments</Title>

        <SubContentBox $column $gap={12} $padding="12px 12px 0px">
          <Typography.H3>Cash</Typography.H3>

          <div>
            <SettingsItem title="Enable cash payments">
              <Switch
                isLoading={isLoading[Payment.IsCashPayment]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.IsCashPayment]}
                onChange={value => handleUpdate(Payment.IsCashPayment, value)}
              />
            </SettingsItem>

            <SettingsItem
              title="Kitchen status (Busy/Not Busy)"
              description="Set available kitchens for cash payment users"
            >
              <LocationsInput
                isLoading={isLoading[Payment.AvailableLocations]}
                isModalOpen={areasModal}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.AvailableLocations]}
                handleAreasModalOpen={handleAreasModalOpen}
                handleAreasModalClose={handleAreasModalClose}
                onSubmit={value =>
                  handleUpdate(Payment.AvailableLocations, value)
                }
              />
            </SettingsItem>

            <SettingsItem
              title="Minimum order (KWD)"
              description="Set the minimum KWD required to proceed with the order for cash payment users"
            >
              <Input
                suffix="KWD"
                fixedDigitsPlaceholder={3}
                step={0.001}
                isLoading={isLoading[Payment.MinimumOrder]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.MinimumOrder]}
                onSubmit={value => handleUpdate(Payment.MinimumOrder, value)}
              />
            </SettingsItem>

            <SettingsItem
              title="Delivery fee (KWD)"
              description="Set delivery fee for cash payment users"
            >
              <Input
                suffix="KWD"
                fixedDigitsPlaceholder={3}
                step={0.001}
                isLoading={isLoading[Payment.DeliveryFeeFiatCents]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.DeliveryFeeFiatCents]}
                onSubmit={value =>
                  handleUpdate(Payment.DeliveryFeeFiatCents, value)
                }
              />
            </SettingsItem>

            <SettingsItem
              title="Minimum top up (KWD)"
              description="Set the minimum to top up the balance"
            >
              <Input
                suffix="KWD"
                fixedDigitsPlaceholder={3}
                step={0.001}
                isLoading={isLoading[Payment.MinimumTopUpValue]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.MinimumTopUpValue]}
                onSubmit={value =>
                  handleUpdateMinimumSettings(Payment.MinimumTopUpValue, value)
                }
              />
            </SettingsItem>
          </div>
        </SubContentBox>

        <SubContentBox $column $gap={12} $padding="12px 12px 0px">
          <Typography.H3>Coins</Typography.H3>

          <div>
            <SettingsItem
              title="Minimum order (FM Coins)"
              description="Set the minimum coins required to proceed with the order for users with active coin package"
            >
              <Input
                suffix="FM Coins"
                fixedDigitsPlaceholder={3}
                step={0.001}
                isLoading={isLoading[Payment.MinimumOrderValue]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.MinimumOrderValue]}
                onSubmit={value =>
                  handleUpdateMinimumSettings(Payment.MinimumOrderValue, value)
                }
              />
            </SettingsItem>

            <SettingsItem
              title="Delivery fee (FM Coins)"
              description="Set delivery fee for users with expired coin package"
            >
              <Input
                suffix="FM Coins"
                fixedDigitsPlaceholder={3}
                step={0.001}
                isLoading={isLoading[Payment.DeliveryFeeFmcCents]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.DeliveryFeeFmcCents]}
                onSubmit={value =>
                  handleUpdate(Payment.DeliveryFeeFmcCents, value)
                }
              />
            </SettingsItem>

            <SettingsItem
              title="Discount (%)"
              description="Set discount percentages for users with active coin package"
            >
              <Input
                suffix="%"
                isLoading={isLoading[Payment.Discount]}
                canUpdate={canPaymentSettingsUpdate}
                data={settings[Payment.Discount]}
                onSubmit={value => handleUpdate(Payment.Discount, value)}
              />
            </SettingsItem>
          </div>
        </SubContentBox>

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
    </>
  );
};
