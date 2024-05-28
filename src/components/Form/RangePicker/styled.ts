// Lib
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import styled from "styled-components";
// Theme
import { theme } from "theme";
// Styled
import { InputStyles } from "../styled";

export const StyledRangePicker = styled(RangePicker)`
  width: 100%;

  ${InputStyles};

  padding-left: 38px !important;

  .ant-picker-suffix {
    position: absolute;
    left: 3px;
  }

  svg {
    path {
      fill: ${theme.color.text.tertiary};
    }
  }
`;
