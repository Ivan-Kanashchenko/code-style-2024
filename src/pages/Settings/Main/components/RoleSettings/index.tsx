// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetPermissionLimitsQuery,
  useUpdatePermissionLimitsMutation,
} from "redux/query/permissionsAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Constants
import { Permission } from "consts";
// Utils
import { errorHandler } from "utils/errorHandler";
// Components
import { Input } from "../Input";
import SettingsItem from "../SettingsItem";
// Styled
import { ContentBox } from "styled/Box";
import { Typography } from "styled/Typography";
import {
  initialLoadingState,
  initialState,
  LoadingStateValues,
  RoleSettingsField,
  StateValues,
} from "./config";

export const RoleSettings: FC = () => {
  const { openNotification } = useNotification();

  const { canSettingsUpdate, canSettingsGet } = usePermissions();

  const [fetchPermissionsLimits] = useLazyGetPermissionLimitsQuery();
  const [updatePermissionLimit] = useUpdatePermissionLimitsMutation();

  const [settings, setSettings] = useState<StateValues>(initialState);

  const [isLoading, setIsLoading] =
    useState<LoadingStateValues>(initialLoadingState);

  const getRolesLimits = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [RoleSettingsField.AgentRoleBalanceExpirationLimit]: true,
        [RoleSettingsField.AgentRoleRefundAddLimit]: true,
        [RoleSettingsField.ManagerRoleBalanceExpirationLimit]: true,
        [RoleSettingsField.ManagerRoleRefundAddLimit]: true,
      }));
      const data = await fetchPermissionsLimits().unwrap();

      const stateData = data.reduce((acc, { name, id, limit }) => {
        switch (name) {
          case Permission.RefundAddAgentLimitUpdate:
            acc[RoleSettingsField.AgentRoleRefundAddLimit] = limit;
            acc[RoleSettingsField.AgentRoleRefundAddLimitId] = id;
            break;
          case Permission.RefundAddManagerLimitUpdate:
            acc[RoleSettingsField.ManagerRoleRefundAddLimit] = limit;
            acc[RoleSettingsField.ManagerRoleRefundAddLimitId] = id;
            break;
          case Permission.BalanceExpirationAgentLimitUpdate:
            acc[RoleSettingsField.AgentRoleBalanceExpirationLimit] = limit;
            acc[RoleSettingsField.AgentRoleBalanceExpirationLimitId] = id;
            break;
          case Permission.BalanceExpirationManagerLimitUpdate:
            acc[RoleSettingsField.ManagerRoleBalanceExpirationLimit] = limit;
            acc[RoleSettingsField.ManagerRoleBalanceExpirationLimitId] = id;
            break;
        }

        return acc;
      }, {});

      setSettings(prev => ({ ...prev, ...stateData }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [RoleSettingsField.AgentRoleBalanceExpirationLimit]: false,
        [RoleSettingsField.AgentRoleRefundAddLimit]: false,
        [RoleSettingsField.ManagerRoleBalanceExpirationLimit]: false,
        [RoleSettingsField.ManagerRoleRefundAddLimit]: false,
      }));
    }
  };

  useEffect(() => {
    if (!canSettingsGet) {
      return;
    }
    getRolesLimits();
  }, []);

  const handleUpdateLimitValue = async (
    key: RoleSettingsField,
    value: number,
  ) => {
    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      await updatePermissionLimit({
        id: settings[`${key}Id`],
        limit: value,
      }).unwrap();

      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <ContentBox $column $gap={12}>
      <Typography.H2>Roles</Typography.H2>

      <div>
        <SettingsItem
          title="Agent role refund (add) limit"
          description="Set refund limit for agent role"
        >
          <Input
            isLoading={isLoading[RoleSettingsField.AgentRoleRefundAddLimit]}
            canUpdate={canSettingsUpdate}
            data={settings[RoleSettingsField.AgentRoleRefundAddLimit]}
            onSubmit={value =>
              handleUpdateLimitValue(
                RoleSettingsField.AgentRoleRefundAddLimit,
                value,
              )
            }
          />
        </SettingsItem>

        <SettingsItem
          title="Agent role balance expiration limit"
          description="Set balance expiration days for agent role"
        >
          <Input
            suffix="days"
            isLoading={
              isLoading[RoleSettingsField.AgentRoleBalanceExpirationLimit]
            }
            canUpdate={canSettingsUpdate}
            data={settings[RoleSettingsField.AgentRoleBalanceExpirationLimit]}
            onSubmit={value =>
              handleUpdateLimitValue(
                RoleSettingsField.AgentRoleBalanceExpirationLimit,
                value,
              )
            }
          />
        </SettingsItem>

        <SettingsItem
          title="Manager role refund (add) limit"
          description="Set refund limit for manager role"
        >
          <Input
            isLoading={isLoading[RoleSettingsField.ManagerRoleRefundAddLimit]}
            canUpdate={canSettingsUpdate}
            data={settings[RoleSettingsField.ManagerRoleRefundAddLimit]}
            onSubmit={value =>
              handleUpdateLimitValue(
                RoleSettingsField.ManagerRoleRefundAddLimit,
                value,
              )
            }
          />
        </SettingsItem>

        <SettingsItem
          title="Manager role balance expiration limit"
          description="Set balance expiration days for manager role"
        >
          <Input
            suffix="days"
            isLoading={
              isLoading[RoleSettingsField.ManagerRoleBalanceExpirationLimit]
            }
            canUpdate={canSettingsUpdate}
            data={settings[RoleSettingsField.ManagerRoleBalanceExpirationLimit]}
            onSubmit={value =>
              handleUpdateLimitValue(
                RoleSettingsField.ManagerRoleBalanceExpirationLimit,
                value,
              )
            }
          />
        </SettingsItem>
      </div>
    </ContentBox>
  );
};
