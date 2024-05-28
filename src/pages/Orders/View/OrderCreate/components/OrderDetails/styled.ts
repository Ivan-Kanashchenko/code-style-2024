import styled from "styled-components";
import { Typography } from "styled/Typography";
import { theme } from "theme";

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(240, 242, 241, 1);
`;

export const Addon = styled(Typography.Description)`
  color: ${theme.color.text.secondary};
`;
