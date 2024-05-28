// Lib
import { FC, useEffect, useState } from "react";
// Api
import {
  useLazyGetExchangeRateQuery,
  useUpdateExchangeRateMutation,
} from "redux/query/exchangeRateAPI";
import {
  useLazyGetBalanceExpirationQuery,
  useUpdateBalanceExpirationMutation,
} from "redux/query/balanceExpirationAPI";
// Hooks
import { useNotification, usePermissions } from "hooks";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
// Layouts
// Components
import SettingsItem from "../SettingsItem";
import { Input } from "../Input";
// Styled
import { ContentBox } from "styled/Box";
import { Typography } from "styled/Typography";

import {
  CurrencyField,
  initialLoadingState,
  initialState,
  LoadingStateValues,
  notificationMessage,
  StateValues,
} from "./config";

export const Currency: FC = () => {
  const { openNotification } = useNotification();

  const {
    canSettingsGet,
    canExchangeRateUpdate,
    canSettingsUpdate,
    canBalanceExpirationUpdate,
  } = usePermissions();

  const [fetchBalanceExpiration] = useLazyGetBalanceExpirationQuery();
  const [fetchExchangeRate] = useLazyGetExchangeRateQuery();
  const [updateExchangeRate] = useUpdateExchangeRateMutation();
  const [updateBalanceExpiration] = useUpdateBalanceExpirationMutation();

  const [settings, setSettings] = useState<StateValues>(initialState);

  const [isLoading, setIsLoading] =
    useState<LoadingStateValues>(initialLoadingState);

  const getBalanceExpiration = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [CurrencyField.BalanceExpirationDays]: true,
      }));

      const { days } = await fetchBalanceExpiration().unwrap();

      setSettings(prev => ({ ...prev, balanceExpirationDays: days }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [CurrencyField.BalanceExpirationDays]: false,
      }));
    }
  };

  const getExchangeRate = async () => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [CurrencyField.ExchangeRateValue]: true,
      }));
      const { value } = await fetchExchangeRate().unwrap();

      setSettings(prev => ({ ...prev, exchangeRateValue: value }));
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [CurrencyField.ExchangeRateValue]: false,
      }));
    }
  };

  useEffect(() => {
    if (!canSettingsGet) {
      return;
    }

    getBalanceExpiration();
    getExchangeRate();
  }, []);

  const handleUpdateExchangeRateValue = async (
    key: CurrencyField.ExchangeRateValue,
    value: number,
  ) => {
    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      await updateExchangeRate({ value }).unwrap();

      setSettings(prev => ({ ...prev, [key]: value }));

      openNotification({ message: notificationMessage[key] });
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleUpdateBalanceExpiration = async (
    key: CurrencyField.BalanceExpirationDays,
    days: number,
  ) => {
    try {
      setIsLoading(prev => ({ ...prev, [key]: true }));

      await updateBalanceExpiration({ days }).unwrap();

      setSettings(prev => ({ ...prev, [key]: days }));

      openNotification({ message: notificationMessage[key] });
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <ContentBox $column $gap={12}>
      <Typography.H2>Currency</Typography.H2>

      <div>
        <SettingsItem
          title="Exchange rate"
          description="Set FM coin exchange rate"
        >
          <Input
            step={0.1}
            precision={1}
            isLoading={isLoading[CurrencyField.ExchangeRateValue]}
            canUpdate={canSettingsUpdate && canExchangeRateUpdate}
            data={settings[CurrencyField.ExchangeRateValue]}
            onSubmit={value =>
              handleUpdateExchangeRateValue(
                CurrencyField.ExchangeRateValue,
                value,
              )
            }
          />
        </SettingsItem>

        <SettingsItem
          title="Virtual currency expiration time"
          description="Set the expiration date when the user topup the balance"
        >
          <Input
            isLoading={isLoading[CurrencyField.BalanceExpirationDays]}
            canUpdate={canSettingsUpdate && canBalanceExpirationUpdate}
            data={settings[CurrencyField.BalanceExpirationDays]}
            onSubmit={value =>
              handleUpdateBalanceExpiration(
                CurrencyField.BalanceExpirationDays,
                value,
              )
            }
          />
        </SettingsItem>
      </div>
    </ContentBox>
  );
};
