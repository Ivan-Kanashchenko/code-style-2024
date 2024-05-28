// Lib
import styled from "styled-components";
import { Button as AntDButton, Avatar as AntDAvatar } from "antd";
// Theme
import { theme } from "theme";
// Components
import { DropDown } from "components/DropDown";

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.color.brand};
  padding: 12px 20px 12px 40px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled(AntDButton)`
  display: flex;
  align-items: center;
`;

export const UserTitle = styled.span`
  padding: 0 7px 0 10px;
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.fontSize.md};
  color: ${theme.color.text.primaty1};
`;

export const Dropdown = styled(DropDown)`
  margin-left: 20px;
`;

export const Avatar = styled(AntDAvatar)`
  background: none;
`;
