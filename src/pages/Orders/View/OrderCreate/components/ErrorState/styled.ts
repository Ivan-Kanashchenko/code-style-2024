import styled from "styled-components";
import { Typography } from "styled/Typography";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(253, 232, 231, 1);
  padding: 16px;
  border-radius: 8px;
`;

export const Title = styled(Typography.Title)`
  color: rgba(243, 38, 25, 1);
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;

  background: rgba(255, 255, 255, 1);
`;
