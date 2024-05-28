import styled from "styled-components";
import { Typography } from "styled/Typography";

export const Title = styled(Typography.H2)`
  padding-left: 12px;
`;

export const InputsContainer = styled.div<{ $bordered?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  padding: 8px 12px;

  ${({ $bordered }) => $bordered && `border-top: 1px solid #E0E0E0;`}
`;

export const EditButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  min-width: 100px;
`;

export const TimeSelectorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 400px;
`;
