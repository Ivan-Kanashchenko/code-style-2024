import styled from "styled-components";
import { theme } from "theme";
import { Typography } from "styled/Typography";
import { IconRoundedContainer } from "styled/Box";

export const Message = styled(Typography.H2)`
  font-weight: ${theme.fontWeight.medium};
`;

export const IconContainer = styled(IconRoundedContainer)`
  margin: 0 0 8px;
`;
