import styled from "styled-components";
import { FlexContainer } from "styled/Box";
import { theme } from "theme";

export const SwitchContainer = styled(FlexContainer)<{
  $labelPosition: "left" | "right";
}>`
  gap: 8px;
  ${({ $labelPosition }) =>
    $labelPosition === "right" &&
    `
    flex-direction: row-reverse;
    `}
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.md};
  line-height: ${theme.lineHeight.md};
  font-weight: ${theme.fontWeight.medium};
`;
