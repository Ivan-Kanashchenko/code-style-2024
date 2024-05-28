// Lib
import { FC } from "react";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
// Icons
import { CurrencyIcon } from "icons";
// Styled
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { IconContainer, Title, Wrapper } from "./styled";

interface ErrorStateProps {
  customerCoinsBalance: number | undefined;
}

export const ErrorState: FC<ErrorStateProps> = ({ customerCoinsBalance }) => {
  return (
    <Wrapper>
      <Title>Insufficient balance</Title>

      <FlexContainer $align="center" $gap={12}>
        <IconContainer>
          <CurrencyIcon width="24" height="24" />
        </IconContainer>

        <FlexContainer $column>
          <Typography.Description>Available balance</Typography.Description>

          <Typography.Title>
            {fixedDigitsValue(customerCoinsBalance, 3)}
          </Typography.Title>
        </FlexContainer>
      </FlexContainer>
    </Wrapper>
  );
};
