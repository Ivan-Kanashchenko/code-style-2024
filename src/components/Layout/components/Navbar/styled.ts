// Lib
import styled from "styled-components";
import { Layout, Menu as AntDMenu } from "antd";
// Theme
import { theme } from "theme";

const { Sider } = Layout;

export const Sidebar = styled(Sider)`
  overflow: auto !important;
  height: 100vh !important;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;

  background: ${theme.color.white} !important;
  border-right: 1px solid ${theme.color.borderLight};

  .ant-layout-sider-children {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    padding-top: 64px;
  }
`;

export const Menu = styled(AntDMenu)`
  padding: 16px;
  border: 0 !important;

  color: ${theme.color.text.primary2};
  line-height: ${theme.lineHeight.md} !important;
  font-size: ${theme.fontSize.md} !important;
  font-weight: ${theme.fontWeight.regular} !important;

  .ant-menu-item {
    padding: 0 16px !important;
    margin: 0;
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;

    cursor: pointer;

    a {
      color: ${theme.color.text.primary2};
      cursor: pointer;
    }
  }

  .ant-menu-submenu {
    margin: 0;

    .ant-menu-sub {
      background: ${theme.color.white} !important;

      .ant-menu-item {
        padding: 0px 16px 0px 46px !important;
      }
    }

    .ant-menu-submenu-title {
      padding: 0px 16px !important;
      margin: 0;
      height: 48px;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }

  .ant-menu-item-selected {
    background: ${theme.color.borderLight};

    a {
      color: ${theme.color.text.primary2};
    }
  }

  &.ant-menu-inline-collapsed {
    .ant-menu-item {
      padding: 6px 14px !important;
    }

    .ant-menu-submenu-title {
      padding: 6px 14px !important;
    }
  }

  svg {
    height: 20px !important;
    width: 20px !important;
    min-width: 20px !important;
    line-height: ${theme.lineHeight.md} !important;
    font-size: ${theme.fontSize.md} !important;
  }
`;

export const CollapseMenu = styled(Menu)<{
  $сollapsebutton?: boolean;
}>`
  ${({ $сollapsebutton }) =>
    $сollapsebutton &&
    `padding: 8px 16px; 
    border-top: 1px solid ${theme.color.borderLight}!important ; `}

  .ant-menu-item {
    display: flex;
    flex-direction: row-reverse;

    .ant-menu-title-content {
      margin-inline-start: 0 !important;
      height: 36px;
      line-height: 36px;
    }
  }

  &.ant-menu-inline-collapsed {
    .ant-menu-item {
      .ant-menu-title-content {
        margin-inline-start: 0 !important;
        display: none;
        height: 36px;
        line-height: 36px;
      }
    }
  }
`;
