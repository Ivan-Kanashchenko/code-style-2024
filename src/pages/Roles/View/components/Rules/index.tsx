// Lib
import { FC } from "react";
// Constants
import { Permission, permissionLabel } from "consts/permissions";
// Icons
import { InfoRedIcon } from "icons";
// Components
import { Badge } from "components";
// Styled
import { FlexContainer, HorizontalDevider } from "styled/Box";
import { Typography } from "styled/Typography";
import { RulesWrapper } from "./styled";

const rules = [
  {
    title: "creating roles require following permissions",
    permissions: [Permission.RolesCreate, Permission.PermissionsGet],
  },
  {
    title: "editing roles require following permissions",
    permissions: [Permission.RolesUpdate, Permission.PermissionsGet],
  },
  {
    title: "creating user require following permissions",
    permissions: [Permission.UsersCreate, Permission.RolesGet],
  },
  {
    title: "editing user require following permissions",
    permissions: [Permission.UsersUpdate, Permission.RolesGet],
  },
  {
    title: "you can set limits for following permissions in settings",
    permissions: [
      Permission.RefundAddAgentLimitUpdate,
      Permission.RefundAddManagerLimitUpdate,
      Permission.BalanceExpirationAgentLimitUpdate,
      Permission.BalanceExpirationManagerLimitUpdate,
    ],
  },
];

export const Rules: FC = () => {
  return (
    <RulesWrapper>
      <Typography.H2>Rules</Typography.H2>

      <FlexContainer $column $gap={16}>
        {rules.map(({ title, permissions }, i) => (
          <>
            <FlexContainer $column $gap={10} key={title + i}>
              <FlexContainer $align="center" $gap={8}>
                <FlexContainer $width="24">
                  <InfoRedIcon />
                </FlexContainer>

                <Typography.DescriptionThin>{title}</Typography.DescriptionThin>
              </FlexContainer>

              <FlexContainer $wrap $gap={8} $padding="0 0 0 32px">
                {permissions.map((p, i) => (
                  <Badge key={p + i} title={permissionLabel[p]} />
                ))}
              </FlexContainer>
            </FlexContainer>

            {i !== rules.length - 1 && <HorizontalDevider />}
          </>
        ))}
      </FlexContainer>
    </RulesWrapper>
  );
};
