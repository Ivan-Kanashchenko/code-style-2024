import styled from "styled-components";
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { theme } from "theme";

export const IconContainer = styled(FlexContainer)`
  border-radius: 50%;
  background: ${theme.color.background.gray};
  padding: 8px;
`;

export const Title = styled(Typography.H2)`
  font-weight: ${theme.fontWeight.medium};
  text-align: center;
`;

export const Description = styled(Typography.Title)`
  font-weight: ${theme.fontWeight.regular};
  text-align: center;
`;
