import styled from "styled-components";
import { Pagination as AntPagination } from "antd";
import { FlexContainer } from "styled/Box";
import { theme } from "theme";

export const Wrapper = styled(FlexContainer)<{
  $shadow?: boolean;
  $onPage?: boolean;
}>`
  position: relative;
  background-color: white;

  ${({ $shadow }) => $shadow && `box-shadow:  ${theme.shadow.table};`}

  ${({ $onPage }) =>
    $onPage &&
    `position: sticky;
    bottom: 0px;
    margin: 0px -32px -32px;
    box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.06);
    height: 64px;
    z-index: 1000;
  `}

  border-bottom-left-radius: ${props => (props?.$onPage ? 0 : "8px")};
  border-bottom-right-radius: ${props => (props?.$onPage ? 0 : "8px")};
`;

export const StyledPagination = styled(AntPagination)`
  .ant-pagination-item {
    min-width: 40px;
    height: 40px;
    font-family: "Inter";
    line-height: 40px;

    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    font-weight: 500;
  }
`;

export const PaginationContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
