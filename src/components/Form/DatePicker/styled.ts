import { DatePicker as AntDDatePicker } from "antd";
import styled from "styled-components";
import { InputStyles } from "../styled";
import { theme } from "theme";

export const StyledDatePicker = styled(AntDDatePicker)<{ status: string }>`
  width: 100%;

  ${InputStyles}

  svg {
    path {
      fill: ${theme.color.text.tertiary};
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;
`;
