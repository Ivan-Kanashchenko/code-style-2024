import styled from "styled-components";
import { Typography } from "styled/Typography";
import { theme } from "theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 20px;
  width: 100%;
  box-shadow: ${theme.shadow.light};
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

export const SummaryItemLabel = styled(Typography.Description)`
  color: ${theme.color.text.tertiary};
`;

export const IconRoundedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: ${theme.color.background.gray};
`;
