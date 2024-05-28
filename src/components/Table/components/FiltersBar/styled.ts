import styled from "styled-components";
import { DatePicker as AntdDatePicker } from "antd";

import { FilterField } from "types/tableFilters";

import { theme } from "theme";
import { CloseBlackIcon } from "icons";

import { Input, Select } from "components/Form";

import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";

const filterWidth = {
  [FilterField.DATE_RANGE]: "300px",
  [FilterField.INPUT]: "220px",
};

export const SelectedFilterContainer = styled(FlexContainer)`
  background-color: ${theme.color.white};
  margin: 12px -16px 0;
  padding: 10px 0px 12px;
  border-top: 1px solid ${theme.color.borderLight};
  overflow: auto;
  flex: 1;
`;

export const FilterSelect = styled(Select)<{ $inputType?: string }>`
  min-width: ${({ $inputType }) =>
    ($inputType && filterWidth[$inputType]) || "200px"};

  height: 32px !important;

  .ant-select-selector {
    min-height: 32px !important;
    height: 32px !important;
  }

  .ant-select-selection-item {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    font-size: 14px !important;
    padding-inline-end: 44px !important;

    &:hover,
    :focus-within,
    :active {
      box-shadow: none !important;
    }
  }
`;

export const FilterInput = styled(Input)<{ $inputType?: string }>`
  min-width: ${({ $inputType }) =>
    ($inputType && filterWidth[$inputType]) || "200px"};

  height: 32px !important;
  display: flex;
  align-items: center;
  font-size: 14px !important;
  padding-inline-end: 29px !important;
  color: black;
  font-weight: 500 !important;
  padding-top: 7px !important;
  padding-bottom: 9px !important;

  .ant-input-prefix {
    margin-inline-end: 4px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    box-shadow: none !important;
  }

  .ant-input {
    box-shadow: none !important;
    font-size: 14px !important;
    color: black;
    font-weight: 500 !important;
  }
`;

export const CloseIcon = styled(CloseBlackIcon)`
  &:hover {
    cursor: pointer;
    opacity: 0.4;
  }
`;

export const AddFilterButton = styled(Button.Base)`
  margin: 0 10px;
  padding: 0;
  height: auto;
  box-shadow: none;

  svg {
    path {
      fill: ${theme.color.blue};
    }
  }

  :hover {
    svg {
      path {
        fill: #124ab7;
      }
    }
  }
`;

export const CheckboxLabelText = styled(Typography.Title)`
  margin-left: 8px;
  font-weight: ${theme.fontWeight.regular};
`;

export const CloseButton = styled(Button.SubHeading)`
  margin-left: auto;
  padding: 4px 8px;
  margin-top: 10px;
  font-weight: ${theme.fontWeight.regular};
`;

export const LabelText = styled(Typography.Title)`
  margin: 5px 0 5px 2px;
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.color.text.tertiary};
`;

export const DatePicker = styled(AntdDatePicker)`
  width: 100%;
`;
