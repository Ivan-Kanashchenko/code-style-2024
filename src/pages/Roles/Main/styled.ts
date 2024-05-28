import styled from "styled-components";
import { Collapse as AntDCollapse } from "antd";
import { theme } from "theme";
import { DownArrowIcon } from "icons";
import { Typography } from "styled/Typography";

export const CollapseContainer = styled.div`
  box-shadow: ${theme.shadow.table};
  border-radius: 8px;
  overflow: auto;
`;

export const CollapseTableWrapper = styled.div`
  box-shadow: ${theme.shadow.table};
  border-radius: 8px;
  min-width: 620px;
`;

export const Header = styled.div<{ $isActions: number }>`
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid rgba(235, 235, 235, 1);

  span:nth-child(1) {
    width: ${({ $isActions }) =>
      $isActions && $isActions === 0
        ? `calc(100% - 320px);`
        : `calc(100% - 320px - ${$isActions * 50}px);`};
  }

  span:nth-child(2) {
    width: 160px;
  }

  span:nth-child(3) {
    width: 160px;
  }

  span:last-child {
    ${({ $isActions }) =>
      !$isActions ? "display: none" : `width: ${$isActions * 50}px`}
  }
`;

export const HeaderItem = styled.span`
  display: inline-block;
  padding: 8px 16px;
  color: ${theme.color.text.tertiary};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.medium};
  line-height: ${theme.lineHeight.base};
`;

export const Collapse = styled(AntDCollapse)`
  border-radius: 0 0 8px 8px;
  box-shadow: none;
  filter: none;

  background: ${theme.color.white};
  border: 0;

  .ant-collapse-item {
    border-color: rgba(235, 235, 235, 1);

    .ant-collapse-header {
      padding: 16px 0 16px 16px;
    }

    .ant-collapse-content {
      padding: 0 16px 0 48px;

      .ant-collapse-content-box {
        width: calc(100% - 420px);
        padding: 0 0 0 0;
      }
    }
  }

  .ant-collapse-item:last-child {
    border-radius: 0 0 8px 8px;
  }

  .ant-collapse-content {
    border-top: 0;
  }
`;

export const DownArrow = styled(DownArrowIcon)<{ $rotate: number }>`
  transform: ${({ $rotate }) => `rotate(${$rotate}deg);`};
  transition: All 0.2s;
`;

export const LabelDescription = styled(Typography.Description)`
  color: ${theme.color.text.tertiary};
`;

export const Action = styled.button`
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  svg {
    g {
      path {
        fill: ${theme.color.text.tertiary};
      }
    }
  }

  &:hover {
    svg {
      g {
        path {
          fill: #727372;
        }
      }
    }
  }
`;
