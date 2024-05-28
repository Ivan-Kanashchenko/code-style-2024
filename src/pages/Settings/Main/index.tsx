// Lib
import { FC } from "react";
// Hooks
import { usePermissions } from "hooks";
// Components
import {
  Currency,
  AuthSettings,
  RoleSettings,
  PurposeTable,
  PaymentSettings,
  ReferralsSettings,
  TimeSlotsSettings,
  ScheduleOrdersSettings,
} from "./components";
// Styled
import { Typography } from "styled/Typography";
import {
  FlexContainer,
  PageHeadingContainer,
  PageTitleContainer,
} from "styled/Box";

export const Settings: FC = () => {
  const {
    сanPurposeGet,
    canTimeSlotsGet,
    canPaymentSettingsGet,
    canReferralsSettingsGet,
    canScheduleOrderSettingsGet,
  } = usePermissions();

  return (
    <>
      <FlexContainer $fullwidth $column $gap={24}>
        <PageHeadingContainer>
          <PageTitleContainer>
            <Typography.H1>Settings</Typography.H1>
          </PageTitleContainer>
        </PageHeadingContainer>

        <FlexContainer $fullwidth $column $gap={16}>
          <Currency />

          <AuthSettings />

          <RoleSettings />

          {canPaymentSettingsGet && <PaymentSettings />}

          {сanPurposeGet && <PurposeTable />}

          {canScheduleOrderSettingsGet && <ScheduleOrdersSettings />}

          {canTimeSlotsGet && <TimeSlotsSettings />}

          {canReferralsSettingsGet && <ReferralsSettings />}
        </FlexContainer>
      </FlexContainer>
    </>
  );
};
