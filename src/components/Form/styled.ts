// Lib
import styled from "styled-components";
import {
  Input as AntInput,
  InputNumber as AntInputNumber,
  Select,
  Space,
} from "antd";

const { TextArea } = AntInput;
// Theme
import { theme } from "theme";

export const hoverErrorStyles = `
 &:focus, :active, :hover, :target, :focus-visible, :focus-within {
   box-shadow: inset 0px 0px 0px 0.5px red !important;
}`;

export const InputFontStyles = `
  font-weight: ${theme.fontWeight.medium} !important;
  font-size: ${theme.fontSize.md} !important;
  line-height: ${theme.lineHeight.md} !important;
  color: ${theme.color.text.primary2} !important;
`;

export const InputStyles = `
  background-color: white !important;
  padding: 7px 12px !important;
  border-radius: 8px !important;
  border-width: 1px !important;
  border-inline-end-width: 1px !important;
`;

export const InputField = styled(AntInput)<{
  phone?: boolean;
  status: string;
  disabled?: boolean;
}>`
  ${InputStyles}
  ${InputFontStyles}

  ${({ disabled }) =>
    disabled &&
    `background-color: rgba(244, 244, 244, 1) !important;  color: rgba(135, 137, 142, 1) !important;`}

  &:hover, :focus, :active, :focus-within, :focus-visible {
    box-shadow: ${({ status, disabled }) =>
      status === "error"
        ? `inset 0px 0px 0px 0.5px #E13A2F !important;`
        : disabled
        ? `none !important;`
        : `inset 0px 0px 0px 0.5px !important;`};
  }

  ${({ status }) =>
    status === "error" &&
    `
  &:hover {
    box-shadow: inset 0px 0px 0px 0.5px #E13A2F !important;
 }
 `}

  input {
    ${InputFontStyles}
  }

  ${({ phone }) =>
    phone &&
    `border-radius: 0 8px 8px 0 !important;
    `}
`;
export const TextAreaField = styled(TextArea)<{
  phone?: boolean;
  disabled?: boolean;
  status: string;
}>`
  ${InputStyles}
  ${InputFontStyles}

  &:hover, :focus, :active, :focus-within, :focus-visible {
    box-shadow: ${({ status }) =>
      status === "error"
        ? `inset 0px 0px 0px 0.5px #E13A2F !important;`
        : `inset 0px 0px 0px 0.5px !important;`};
  }

  ${({ status }) =>
    status === "error" &&
    `
  &:hover {
    box-shadow: inset 0px 0px 0px 0.5px #E13A2F !important;
 }
 `}

  ${({ disabled }) =>
    disabled &&
    `
    color:${theme.color.text.disabled} !important;
    background: #F4F4F4 !important;

  &:hover {
    box-shadow: none !important;
 }
 `}
`;

export const InputFieldNumber = styled(AntInputNumber)<{
  $quantity?: boolean;
  $phone?: boolean;
  status: string;
}>`
  ${InputStyles}
  ${InputFontStyles}

  width: 100%;
  height: 40px;
  padding: 4px 12px 4px 3px !important ;

  input {
    padding-left: 9px !important ;
    ${InputFontStyles}
  }

  ${({ $phone }) =>
    $phone &&
    `border-radius: 0 8px 8px 0 !important;
    `}

  ${({ $quantity }) =>
    $quantity &&
    `border-radius: 0 !important;
    padding: 4px 0px  !important;

    .ant-input-number-input-wrap {
      text-align: center !important;
    }
    
    input {
      text-align: center !important;
       padding: 3px 9px !important ;
    }
    &:hover {
    z-index: 15 !important;
  }

  &.ant-input-number-focused {
    z-index: 15 !important;
  }
    `}
`;

export const InputFieldPassword = styled(AntInput.Password)<{
  disabled?: boolean;
  status: string;
}>`
  ${InputStyles}

  ${({ disabled }) =>
    disabled &&
    `background-color: rgba(244, 244, 244, 1) !important;  color: rgba(135, 137, 142, 1) !important;`}

  &:hover, :focus, :focus-within, :focus-visible {
    box-shadow: ${({ status, disabled }) =>
      status === "error"
        ? `inset 0px 0px 0px 0.5px #E13A2F !important;`
        : disabled
        ? `none !important;`
        : `inset 0px 0px 0px 0.5px !important;`};
  }

  ${({ status }) =>
    status === "error" &&
    `
  &:hover {
    box-shadow: inset 0px 0px 0px 0.5px #E13A2F !important;
 }
 `}

  input {
    font-weight: 500 !important;
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.color.error};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.md};
  font-weight: ${theme.fontWeight.medium};
`;

export const SelectField = styled(Select)<{ $phone?: boolean; status: string }>`
  width: 100%;
  height: 40px;

  .ant-select-selector {
    ${InputStyles}
    padding: 0 12px !important;
    min-height: 40px !important;

    ${({ $phone }) =>
      $phone &&
      `border-radius: 8px 0 0 8px !important;
      min-width: 93px;
    `}
  }
  .ant-select-selection-item {
    padding-top: 7px !important;
    padding-bottom: 9px !important;
    ${InputFontStyles}
  }

  .ant-select-selection-item {
    ${InputFontStyles}
  }
`;

export const SearchSelectField = styled(SelectField)`
  .ant-select-selector {
    padding: 0 0 0 12px !important;

    input {
      ${InputFontStyles}
    }
  }
`;

export const PhoneSelectField = styled(SelectField)`
  .ant-select-selector {
    border-radius: 0 !important;
  }
`;

export const PhoneInputField = styled(InputField)`
  border-radius: 0 8px 8px 0 !important;
`;

export const SearchInputField = styled(AntInput)<{ open: boolean }>`
  ${InputStyles}
  ${InputFontStyles}
  padding: 7px 8px !important;
  width: ${({ open }) => (open ? "440px" : "40px")};

  .ant-input-prefix {
    div {
      box-shadow: none !important;

      svg : {
        box-shadow: none !important;
      }
    }

    &:hover {
      margin-inline-end: 4px !important;
      box-shadow: none !important;

      svg {
        box-shadow: none !important;
      }
    }
  }

  span.ant-input-suffix {
    box-shadow: none !important;
    svg {
      box-shadow: none !important;

      &:hover {
        box-shadow: none !important;
      }
    }

    &:hover {
      margin-inline-start: 4px !important;
      box-shadow: none !important;

      span {
        box-shadow: none !important;
        svg: {
          box-shadow: none !important;
        }
      }
    }
  }

  input {
    &:hover {
      box-shadow: none !important;
    }
  }

  :hover {
    cursor: pointer;
  }
`;

export const PhoneCompact = styled(Space.Compact)`
  width: 100%;
`;
