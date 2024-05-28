// Libs
import styled from "styled-components";
import { Checkbox } from "antd";
// Theme
import { theme } from "theme";

export const CheckboxField = styled(Checkbox)`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  line-height: ${theme.lineHeight.md};
  letter-spacing: 0em;
  text-align: left;

  .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    border-width: 2px;
    border-color: ${theme.color.text.disabled};
    border-radius: 4px;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: transparent;
  }

  .ant-checkbox-disabled .ant-checkbox-inner {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.04);
  }
`;
