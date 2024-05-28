import styled from "styled-components";
import { Button as AntButton } from "antd";
import { theme } from "theme";

const Login = styled(AntButton)`
  height: 48px;
`;

const Notification = styled(AntButton)`
  height: 27px;
`;

interface ButtonBase {
  iconEnd?: boolean;
  padding?: string;
  shadow?: "table" | "light" | "bold" | "none";
  status?: "success" | "danger" | "warning";
}

const Base = styled(AntButton)<ButtonBase>`
  font-weight: ${theme.fontWeight.medium};
  padding: ${({ padding }) => (padding ? `${padding};` : "8px 16px;")};
  height: 40px;
  display: flex;
  box-shadow: ${theme.shadow.light};

  ${({ shadow = "light" }) => shadow && `box-shadow: ${theme.shadow[shadow]};`}

  align-items: center;
  justify-content: center;

  ${({ iconEnd }) =>
    iconEnd &&
    `
  flex-direction: row-reverse;
  
  .ant-btn-icon {
    margin-inline-start: 4px;
    margin-inline-end: 0px !important;
  };`}

  ${({ status }) => {
    if (status === "success") {
      return `
      color: ${theme.color.white};
      background-color: ${theme.color.status.success};
      border-color: ${theme.color.status.success};
      `;
    }
    if (status === "danger") {
      return `
      color: ${theme.color.white};
      background-color: ${theme.color.red};
      border-color: ${theme.color.red};
      `;
    }
    if (status === "warning") {
      return `
      color: ${theme.color.white};
      background-color: ${theme.color.status.warning};
      border-color: ${theme.color.status.warning};
      `;
    }
  }}
`;

const Form = styled(Base)`
  padding: 8px 12px;
`;

const Form2 = styled(Base)`
  padding: 12px 16px;
`;

const SquaredIcon = styled(Base)`
  min-width: 40px !important;
`;

const Heading = styled(Base)`
  padding: 12px 20px;
  height: auto;
`;

const SubHeading = styled(Base)`
  padding: 7px 12px;
  height: auto;
`;

export const Button = {
  Base,
  Heading,
  SubHeading,
  Notification,
  Login,
  SquaredIcon,
  Form,
  Form2,
};

export type ButtonType =
  | typeof Button.Base
  | typeof Button.Heading
  | typeof Button.SubHeading
  | typeof Button.Notification
  | typeof Button.Login
  | typeof Button.SquaredIcon
  | typeof Button.Form
  | typeof Button.Form2;
