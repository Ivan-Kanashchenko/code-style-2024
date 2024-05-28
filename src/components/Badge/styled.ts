import styled from "styled-components";
import { theme } from "theme";

export const StyledBadge = styled.span<{
  $capitalize?: boolean;
  $isTableStatusBadge?: boolean;
  $color: string;
  $backgroundColor: string;
  $border: string;
}>`
  display: inline-block;
  color: ${props => props.$color};
  background: ${props => props.$backgroundColor};
  border-radius: 5px;
  padding: ${props => (props.$isTableStatusBadge ? "4px 8px" : "2px 8px")};
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.base};
  text-transform: ${props =>
    props.$isTableStatusBadge ? "capitalize" : "none"};
  text-transform: ${props => (props.$capitalize ? "capitalize" : "none")};
  border: ${props => props.$border || ""};
`;
