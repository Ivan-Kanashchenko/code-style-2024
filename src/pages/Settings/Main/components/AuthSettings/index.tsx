// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetAuthSettingsQuery,
  useUpdateAuthSettingsMutation,
} from "redux/query/authSettingsAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Helpers
import { getConfirmModalTitle } from "../../helpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import { PersonIcon } from "icons";
// Components
import { ConfirmDialog } from "components/Modals";
import { SettingsItem } from "../SettingsItem";
import { Switch } from "../Switch";
// Styled
import { ContentBox } from "styled/Box";
import { Typography } from "styled/Typography";

import {
  ConfirmModalType,
  Field,
  initialLoadingState,
  initialState,
  LoadingStateValues,
  notificationMessage,
  StateValues,
} from "./config";

export const AuthSettings: FC = () => {
  const { openNotification } = useNotification();

  const {
    canCouponsSettingsGet,
    canMenuGridSettingsGet,
    canUpdateWaitingListSettings,
    canSettingsUpdate,
    canCouponsSettingsUpdate,
    canMenuGridSettingsUpdate,
  } = usePermissions();

  const [fetchAuthSettings] = useLazyGetAuthSettingsQuery();
  const [updateAuthSettings] = useUpdateAuthSettingsMutation();

  const [settings, setSettings] = useState<StateValues>(initialState);

  const [isLoading, setIsLoading] =
    useState<LoadingStateValues>(initialLoadingState);

  const [confirmModal, setConfirmModal] = useState<ConfirmModalType | false>(
    false,
  );

  const getAuthSettings = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [Field.AllowAccountActivation]: true,
        [Field.RequireInvitation]: true,
        [Field.AllowCoupons]: true,
        [Field.AllowMenuItemsGrid]: true,
      }));

      const {
        allowAccountActivation,
        allowMenuItemsGrid,
        requireInvitation,
        isWaitList,
        coupon,
      } = await fetchAuthSettings().unwrap();

      setSettings(prev => ({
        ...prev,
        allowAccountActivation,
        requireInvitation,
        isWaitList,
        allowMenuItemsGrid,
        isCoupon: coupon.isCoupon,
      }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [Field.AllowAccountActivation]: false,
        [Field.RequireInvitation]: false,
        [Field.AllowCoupons]: false,
        [Field.AllowMenuItemsGrid]: false,
      }));
    }
  };

  const handleUpdateAuthSettings = async (key: Field, value: boolean) => {
    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      const payload = {
        [key]: value,
      };

      setSettings(prev => ({ ...prev, [key]: value }));

      await updateAuthSettings(payload).unwrap();

      openNotification({ message: notificationMessage[key] });
    } catch (error) {
      setSettings(prev => ({ ...prev, [key]: !value }));

      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));

      if (confirmModal) {
        setConfirmModal(false);
      }
    }
  };

  const handleUpdate = (key: Field, value: StateValues[Field]) => {
    switch (key) {
      case Field.AllowAccountActivation:
      case Field.RequireInvitation:
        handleUpdateAuthSettings(key, value as boolean);
        return;

      case Field.AllowWaitingList:
      case Field.AllowMenuItemsGrid:
      case Field.AllowCoupons:
        setSettings(prev => ({ ...prev, [key]: value as boolean }));
        setConfirmModal({ key, value });
        return;

      default:
        break;
    }
  };

  useEffect(() => {
    getAuthSettings();
  }, []);

  const onConfirm = () => {
    if (!confirmModal) return;

    switch (confirmModal.key) {
      case Field.AllowWaitingList:
      case Field.AllowCoupons:
      case Field.AllowMenuItemsGrid:
        handleUpdateAuthSettings(
          confirmModal.key,
          confirmModal.value as boolean,
        );
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
        <Typography.H2>Allow friends invites in the app</Typography.H2>

        <div>
          <SettingsItem title="Enable invite friends code sharing">
            <Switch
              isLoading={isLoading[Field.AllowAccountActivation]}
              canUpdate={canSettingsUpdate}
              data={settings[Field.AllowAccountActivation]}
              onChange={value =>
                handleUpdate(Field.AllowAccountActivation, value)
              }
            />
          </SettingsItem>

          <SettingsItem title="Require invitation to access app">
            <Switch
              isLoading={isLoading[Field.RequireInvitation]}
              canUpdate={canSettingsUpdate}
              data={settings[Field.RequireInvitation]}
              onChange={value => handleUpdate(Field.RequireInvitation, value)}
            />
          </SettingsItem>
        </div>
      </ContentBox>

      <ContentBox $column $gap={12}>
        <Typography.H2>Waiting List</Typography.H2>

        <div>
          <SettingsItem
            title="Require user activation"
            description="For new unregistered users"
          >
            <Switch
              isLoading={isLoading[Field.AllowWaitingList]}
              canUpdate={canSettingsUpdate && canUpdateWaitingListSettings}
              data={settings[Field.AllowWaitingList]}
              onChange={value => handleUpdate(Field.AllowWaitingList, value)}
            />
          </SettingsItem>
        </div>
      </ContentBox>

      {canCouponsSettingsGet && (
        <ContentBox $column $gap={12}>
          <Typography.H2>Coupons</Typography.H2>

          <div>
            <SettingsItem title="Enable coupons codes">
              <Switch
                isLoading={isLoading[Field.AllowCoupons]}
                canUpdate={canSettingsUpdate && canCouponsSettingsUpdate}
                data={settings[Field.AllowCoupons]}
                onChange={value => handleUpdate(Field.AllowCoupons, value)}
              />
            </SettingsItem>
          </div>
        </ContentBox>
      )}

      {canMenuGridSettingsGet && (
        <ContentBox $column $gap={12}>
          <Typography.H2>Allow Menu Items Grid</Typography.H2>

          <div>
            <SettingsItem
              title="Enable menu items grid"
              description="Set the display of the menu as a grid in the mobile application"
            >
              <Switch
                isLoading={isLoading[Field.AllowMenuItemsGrid]}
                canUpdate={canSettingsUpdate && canMenuGridSettingsUpdate}
                data={settings[Field.AllowMenuItemsGrid]}
                onChange={value =>
                  handleUpdate(Field.AllowMenuItemsGrid, value)
                }
              />
            </SettingsItem>
          </div>
        </ContentBox>
      )}

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
