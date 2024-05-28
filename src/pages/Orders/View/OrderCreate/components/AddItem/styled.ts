import { styled } from "styled-components";
import { Typography } from "styled/Typography";
import { theme } from "theme";

export const InputsGridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const Title = styled(Typography.Title)`
  font-weight: ${theme.fontWeight.semiBold};
`;
