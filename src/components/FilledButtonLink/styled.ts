import { FC } from "react";
import styled from "styled-components";
import { Button } from "styled/Buttons";
import { theme } from "theme";

export const StyledButton = styled(Button.Base)<{ icon: FC }>`
  padding: 0;
  height: auto;
  box-shadow: none;

  color: ${theme.color.text.tertiary};
  border-radius: 4px;

  padding: ${({ icon }) => (!icon ? "2px 4px" : "0 8px 0 0")};

  /* padding-right: 18px; */
  /* padding: 0 4px; */

  svg {
    path {
      fill: ${theme.color.text.tertiary};
    }
  }

  &:hover {
    background: #e2e9f8 !important;
    color: #3662b6 !important;

    svg {
      path {
        fill: #3662b6;
      }
    }
  }

  &.ant-btn:not(.ant-btn-icon-only) > .ant-btn-icon:not(:last-child) {
    margin-inline-end: 4px;
  }
`;
