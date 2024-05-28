import styled from "styled-components";
import { Segmented } from "antd";
import { theme } from "theme";

export const Wrapper = styled.div`
  overflow: auto;
`;

export const StyledSegmented = styled(Segmented)`
  font-size: ${theme.fontSize.md};

  font-weight: ${theme.fontWeight.medium};
  line-height: ${theme.lineHeight.md};

  padding: 4px;

  .ant-segmented-item {
    height: 40px;
    min-width: 80px;
  }

  .ant-segmented-item-label {
    padding: 6px 16px;
  }
`;
