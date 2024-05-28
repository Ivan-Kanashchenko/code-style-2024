import styled from "styled-components";
import { Typography } from "styled/Typography";
import { theme } from "theme";

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 24px;
  background-color: rgba(235, 235, 235, 1);
`;

export const Description = styled(Typography.Description)`
  color: ${theme.color.text.tertiary};
`;

export const HistoryItem = styled.div`
  display: flex;
  gap: 12px;
`;

export const Devider = styled.div`
  position: absolute;
  bottom: -34px;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 34px;
  background-color: rgba(235, 235, 235, 1);
`;

export const HistoryItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;
`;
