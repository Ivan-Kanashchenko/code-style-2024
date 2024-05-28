// Lib
import styled, { createGlobalStyle } from "styled-components";
//Theme
import { theme } from "theme";

export const GlobalStyles = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.base};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.color.text.primary2};
  background: ${theme.color.background.primary};

  -webkit-tap-highlight-color: transparent;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
  
.ant-menu-submenu-popup {
  .ant-menu-item {
    margin: 4px !important;
  }
}

.ant-notification-notice-wrapper {

  border-radius: 8px  !important;
    overflow: hidden   !important;
}

.ant-notification-notice {
  width: 396px !important;
  padding: 16px 37px 16px 18px !important;
  border-radius: 8px  !important;
    overflow: hidden   !important;
    
}

.ant-notification-notice::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-left: 4px solid;
}

.notification-error::before {
  border-left-color: #ff4d4f;
}

.notification-success::before {
  border-left-color: #3A834D;
}

.notification-warning::before {
  border-left-color: #faad14;
}

.notification-info::before {
  border-left-color: #3662b6;
}

.ant-notification-notice-close {
  top: 18px !important;
  inset-inline-end: 15px !important;
}

.ant-notification-notice-content div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ant-notification-notice-message {
  margin-inline-start: 30px !important;
  margin-bottom: 0px !important;
}

.notification-button .ant-notification-notice-message {
  max-width: 243px;
  margin-inline-start: 30px !important;
  margin-bottom: 0px !important;
  padding-inline-end: 0px !important;;
}

.ant-notification-notice-description {
  order: 3;
  width: 100%;
  margin-inline-start: 30px !important;
}

.ant-notification-notice-btn {
  margin-top: -3px !important;
  padding-right: 20px !important;
}

.ant-btn-default:not(:disabled):hover {
    background-color: #edf0ee ;
    color: #031306 ;
    border: 1px solid #E0E0E0 ;
}
.ant-btn-primary:disabled {
    border-color: ${theme.color.brandDisabled};
    color: ${theme.color.white};
    background-color: ${theme.color.brandDisabled};
    box-shadow: none;
}

button[status="success"].ant-btn-default:not(:disabled):hover {
  color: ${theme.color.white};
  background-color: rgb(100 163 100);
  border-color: rgb(100 163 100);
}

button[status="danger"].ant-btn-default:not(:disabled):hover {
  color: ${theme.color.white};
  background-color: rgb(253 106 96);
  border-color: rgb(253 106 96);
}

button[status="warning"].ant-btn:not(:disabled):hover {
  color: ${theme.color.white};
  background-color: rgb(247 198 82);
  border-color: rgb(247 198 82);
}

.ant-dropdown-menu-item {
  padding: 8px 12px !important;
}

.ant-switch {
  background: ${theme.color.background.neutral};
  min-width: 40px;
}

.ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background: ${theme.color.status.success};
}
.ant-switch.ant-switch-checked:not(.ant-switch-disabled) {
    background: ${theme.color.status.success};
}

.ant-picker-ok {
  button{ 
    font-size: ${theme.fontSize.base} !important;
  } 
}
.ant-picker-now {
  button{ 
    font-size: ${theme.fontSize.base} !important;
  } 
}

.ant-input-prefix {
  margin-inline-end: 4px !important;
}

.ant-picker-input {
  &:hover {
    box-shadow: none !important;
  }

  input:hover {
    box-shadow: none !important;
  }
}

.ant-input-affix-wrapper:hover {
  box-shadow: inset 0px 0px 0px 0.5px;
}

.ant-input-affix-wrapper .ant-input-affix-wrapper-focused {
  box-shadow: inset 0px 0px 0px 0.5px ;
}

.ant-input-affix-wrapper-focused {
  box-shadow: inset 0px 0px 0px 0.5px ;
}

.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
  box-shadow: inset 0px 0px 0px 0.5px;
}

.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
  box-shadow: inset 0px 0px 0px 0.5px #E13A2F;
}

.ant-input-affix-wrapper .ant-input-affix-wrapper-focused .ant-input-affix-wrapper-status-error {
  box-shadow: inset 0px 0px 0px 0.5px #E13A2F;
}

.ant-input-number:hover {
  box-shadow: inset 0px 0px 0px 0.5px;
}

.ant-input-number .ant-input-number-handler-wrap {
  height: 35px;
  margin: 2px;
}

.ant-input-number-focused {
  box-shadow: inset 0px 0px 0px 0.5px !important;
}

.ant-input-number-status-error:not(.ant-input-number-disabled):not(.ant-input-number-borderless).ant-input-number:hover {
  border-color: #E13A2F;
  box-shadow: inset 0px 0px 0px 0.5px #E13A2F !important;
}

.ant-input-number-status-error:not(.ant-input-number-disabled):not(.ant-input-number-borderless).ant-input-number-focused {
  border-color: #E13A2F;
  box-shadow: inset 0px 0px 0px 0.5px #E13A2F !important;
}

.ant-input-number.ant-input-number-disabled {
  background: #F4F4F4 !important;
  
  input { 
    color: #87898E !important;
  }
  &:hover {
    box-shadow: none;
  }
}

.ant-picker:hover {
  box-shadow: inset 0px 0px 0px 0.5px;
}

.ant-picker:not(.ant-picker-disabled):not([disabled]).ant-picker-status-error:hover {
  box-shadow: inset 0px 0px 0px 0.5px #E13A2F;
}

.ant-picker.ant-picker-disabled {
    background: #F4F4F4 !important;

    input {
      &:hover{
        background: transparent !important;
      }
    }

    &:hover{
      box-shadow: none;
    }
}

.ant-select-dropdown {
  z-index: 10;
}

.ant-select-selector:not(.ant-select-disabled):hover {
  box-shadow: inset 0px 0px 0px 0.5px;
}

.ant-select-focused:where(*).ant-select:not(.ant-select-status-error):not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
    box-shadow: inset 0px 0px 0px 0.5px;
}

.ant-select-focused:where(*).ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
    box-shadow: inset 0px 0px 0px 0.5px #E13A2F ;
}

.ant-select-status-error {

  &:hover {
    .ant-select-selector {
    box-shadow: inset 0px 0px 0px 0.5px #E13A2F;
    }
  }
}

.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background-color: #F4F4F4 !important;
  .ant-select-selection-item {
    color: #87898E !important;
  }

  &:hover{
      box-shadow: none;
    }
}

.ant-picker-dropdown .ant-picker-time-panel-column >li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner {
    background: ${theme.color.brand};
    color: ${theme.color.white};
}

.ant-menu-item {
  color: ${theme.color.text.primary2} !important;
}

.ant-menu-item-selected {
  background: ${theme.color.borderLight} !important;
  color: ${theme.color.text.primary2} !important;
}

.ant-menu-light>.ant-menu:not(.ant-menu-horizontal) .ant-menu-item:not(.ant-menu-item-selected):active {
  color: ${theme.color.text.primary2} !important;
  background: ${theme.color.borderLight} !important;
}

.ant-menu-item:not(.ant-menu-item-selected):active {
  background: ${theme.color.borderLight} !important;
}

`;

export const AppContainer = styled.div`
  min-height: 100vh;
`;
