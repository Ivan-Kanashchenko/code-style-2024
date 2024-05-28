import styled from "styled-components";
import { Tabs as AntDTabs } from "antd";

export const StyledTabs = styled(AntDTabs)`
  .ant-tabs-tab {
    padding: 12px 16px;
  }

  .ant-tabs-nav::before {
    border-bottom: 0px;
  }

  .ant-tabs-ink-bar .ant-tabs-ink-bar-animated {
    color: yellow;
    background-color: yellow;
    border-bottom: 0px;
  }
`;
