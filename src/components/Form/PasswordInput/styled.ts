// Lib
import styled from "styled-components";
// Theme
import { theme } from "theme";
// Icons
import { EyeInvisibleIcon, EyeVisibleIcon } from "icons";

export const InvisibleIcon = styled(EyeVisibleIcon)`
  cursor: pointer;

  path {
    fill: ${theme.color.text.tertiary};
  }

  :hover {
    path {
      fill: ${theme.color.brand};
    }
  }
`;

export const VisibleIcon = styled(EyeInvisibleIcon)`
  cursor: pointer;

  path {
    fill: ${theme.color.brand};
  }
`;
