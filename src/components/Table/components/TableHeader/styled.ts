import styled from "styled-components";
import { theme } from "theme";

import { Tabs } from "components/Tabs";

import { FlexContainer } from "styled/Box";

export const Wrapper = styled(FlexContainer)<{ $isSelectedFilter?: boolean }>`
  background-color: ${theme.color.white};
  padding: ${props => (props.$isSelectedFilter ? "12px 16px 0" : "12px 16px")};
  border-bottom: 1px solid ${theme.color.borderLight};
  min-height: 64px;
`;

export const HeaderTabs = styled(Tabs)`
  &.ant-tabs-top > .ant-tabs-nav {
    margin: 0 0 -16px 0;
  }
`;

export const RedDot = styled.div`
  position: absolute;
  top: 7px;
  right: 4px;
  border-radius: 5px;
  width: 8px;
  height: 8px;
  background-color: ${theme.color.red};
`;
