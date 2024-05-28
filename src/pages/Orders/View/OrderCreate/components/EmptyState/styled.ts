import styled from "styled-components";
import { FlexContainer } from "styled/Box";
import { theme } from "theme";

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
  gap: 16px;
  background-color: #f7f9f8;
  border-radius: 8px;
  border: 1px dashed ${theme.color.background.secondary2};
`;

export const EmptyIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.color.background.secondary};
`;
