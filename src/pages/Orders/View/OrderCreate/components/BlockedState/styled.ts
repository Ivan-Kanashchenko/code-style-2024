import styled from "styled-components";
import { theme } from "theme";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    #ffffff 55.42%
  );
  border-radius: 8px;
  pointer-events: all;
`;

export const BlockedIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.color.background.secondary};
`;
