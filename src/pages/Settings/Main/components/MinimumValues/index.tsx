// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetSettingsQuery,
  useUpdateSettingsMutation,
} from "redux/query/settingsAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
// Layouts
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
  MinimumValuesField,
  notificationMessage,
  StateValues,
} from "./config";

export const MinimumValues: FC = () => {
  const { openNotification } = useNotification();

  const { canSettingsUpdate, canSettingsGet } = usePermissions();

  const [fetchSettings] = useLazyGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  const [settings, setSettings] = useState<StateValues>(initialState);

  const [isLoading, setIsLoading] =
    useState<LoadingStateValues>(initialLoadingState);

  const getSettings = async () => {
    try {
      setIsLoading({
        [MinimumValuesField.MinimumOrderValue]: true,
        [MinimumValuesField.MinimumTopUpValue]: true,
      });

      const { minimumOrderValue, minimumTopUpValue } =
        await fetchSettings().unwrap();

      setSettings(prev => ({ ...prev, minimumOrderValue, minimumTopUpValue }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading({
        [MinimumValuesField.MinimumOrderValue]: false,
        [MinimumValuesField.MinimumTopUpValue]: false,
      });
    }
  };

  useEffect(() => {
    if (!canSettingsGet) {
      return;
    }

    getSettings();
  }, []);

  const handleUpdateSettings = async (
    key: MinimumValuesField,
    value: number,
  ) => {
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

  return (
    <ContentBox $column $gap={12}>
      <Typography.H2>Minimum values</Typography.H2>

      <div>
        <SettingsItem
          title="Order (FM coins)"
          description="Set the minimum coins required to proceed with the order"
        >
          <Input
            isLoading={isLoading[MinimumValuesField.MinimumOrderValue]}
            canUpdate={canSettingsUpdate}
            data={settings[MinimumValuesField.MinimumOrderValue]}
            onSubmit={value =>
              handleUpdateSettings(MinimumValuesField.MinimumOrderValue, value)
            }
          />
        </SettingsItem>

        <SettingsItem
          title="Top up (KWD)"
          description="Set the minimum to top up the balance"
        >
          <Input
            suffix="KWD"
            isLoading={isLoading[MinimumValuesField.MinimumTopUpValue]}
            canUpdate={canSettingsUpdate}
            data={settings[MinimumValuesField.MinimumTopUpValue]}
            onSubmit={value =>
              handleUpdateSettings(MinimumValuesField.MinimumTopUpValue, value)
            }
          />
        </SettingsItem>
      </div>
    </ContentBox>
  );
};
