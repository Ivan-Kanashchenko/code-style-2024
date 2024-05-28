import styled from "styled-components";
import { Button } from "styled/Buttons";
import { theme } from "theme";

export const StyledButton = styled(Button.Base)<{
  $danger?: boolean;
  $grey?: boolean;
  iconEnd?: boolean;
}>`
  padding: 0;
  height: auto;
  box-shadow: none;

  ${({ $grey }) => $grey && `color: ${theme.color.text.tertiary} !important;`}

  svg {
    path {
      fill: ${({ $danger, $grey }) =>
        $danger
          ? theme.color.red
          : $grey
          ? theme.color.text.tertiary
          : theme.color.blue};
    }
  }

  :hover {
    svg {
      path {
        fill: #124ab7;
        fill: ${({ $danger, $grey }) =>
          $danger ? "rgb(253 106 96)" : $grey ? "#727372" : "#124ab7"};
      }
    }
  }
`;
