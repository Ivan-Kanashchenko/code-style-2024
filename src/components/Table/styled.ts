import styled from "styled-components";
import { Table as AntTable } from "antd";
import { theme } from "theme";

export const AntTableStyled = styled(AntTable)<{
  $accentColumn?: number;
  $expandedRows: React.Key[];
  $accentColumnWidth?: string;
  $withPagination?: boolean;
  $nested?: boolean;
  $clicable?: boolean;
  $wrapTitles?: boolean;
  $dragRowId?: null | string;
  $minWidth?: number;
}>`
  border-bottom-left-radius: ${({ $withPagination, $nested }) =>
    $withPagination ? 0 : $nested ? 0 : "8px"};

  border-bottom-right-radius: ${({ $withPagination, $nested }) =>
    $withPagination ? 0 : $nested ? 0 : "8px"};
  overflow: auto;

  ${({ $minWidth }) =>
    $minWidth &&
    `
  table {
    min-width: ${$minWidth}px;
  }
  `}

  .ant-table-thead {
    ${({ $nested }) => $nested && `display: none;`};

    & .ant-table-cell {
      vertical-align: middle;

      background: ${theme.color.lightGreen};
      color: ${theme.color.text.tertiary};
      font-size: ${theme.fontSize.base};
      font-weight: ${theme.fontWeight.medium};
      line-height: ${theme.lineHeight.base};

      ${({ $wrapTitles }) => !$wrapTitles && `white-space: nowrap;`};
    }
  }

  .ant-table-placeholder {
    color: black !important;
  }

  .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0px;
  }

  ${({ $accentColumn, $accentColumnWidth }) =>
    $accentColumn &&
    `
  & .ant-table-container table > thead > tr:first-child > *:nth-child(${$accentColumn}) {
    width: ${$accentColumnWidth || "100%"};
  }`}

  .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0px;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    width: 0px;
  }

  .ant-table-thead
    > tr
    > td:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    width: 0px;
  }
  .ant-spin-nested-loading {
    border-bottom-left-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
    border-bottom-right-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
  }
  .ant-spin-nested-loading .ant-spin-container {
    border-bottom-left-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
    border-bottom-right-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
  }

  .ant-table-wrapper .ant-table {
    border-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
  }
  .ant-table-wrapper .ant-table-container {
    border-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
  }

  .ant-table-header {
    border-radius: 0 !important;
  }

  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > td,
  .ant-table-wrapper tfoot > tr > th,
  .ant-table-wrapper tfoot > tr > td {
    /* padding: 10px 16px; */
  }

  & .ant-table-thead > tr > th,
  & .ant-table-tbody > tr > th {
    padding: 8px 12px;
  }

  & .ant-table-tbody > tr > td {
    padding: 8px 12px;
    vertical-align: middle;
    white-space: nowrap;
    ${({ $clicable }) => $clicable && `cursor: pointer`};
  }

  ${({ $accentColumn }) =>
    $accentColumn &&
    `
  & .ant-table-tbody > tr > *:nth-child(${$accentColumn}) {
    font-weight: ${theme.fontWeight.medium};
  }`}

  ${({ $nested }) =>
    $nested &&
    `.ant-table-tbody > tr:last-child > * {
    border: 0;
  }`}


  .ant-table-tbody {
    & .ant-table-row {
      & .ant-table-cell {
        color: ${theme.color.text.primary2};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        background: ${theme.color.white};
      }
    }
  }

  .ant-checkbox-wrapper {
    padding: 0px 4px;
  }

  &.ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell-row-hover,
  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-row-selected > td,
  &.ant-table-wrapper
    .ant-table-tbody
    > tr.ant-table-row-selected
    > td.ant-table-cell-row-hover {
    background: ${({ $nested }) =>
      $nested ? `${theme.color.white} !important` : "#e9ede9"};
  }

  .ant-table-tbody > tr.ant-table-row-selected:hover > td {
    background: ${({ $nested }) =>
      $nested ? `${theme.color.white} !important` : theme.color.lightGreen};
  }

  .ant-table-tbody > tr.ant-table-expanded-row > td.ant-table-cell {
    padding: 0;
  }

  ${({ $expandedRows }) =>
    !!$expandedRows.length &&
    $expandedRows.map(
      attr =>
        `.ant-table-tbody > tr[data-row-key="${attr}"] > td.ant-table-cell { 
          background: #e9ede9;
        }`,
    )}

  ${({ $dragRowId }) =>
    $dragRowId !== null &&
    `.ant-table[id="${$dragRowId}"] .ant-table-tbody .ant-table-row .ant-table-cell { 


      -webkit-box-shadow: inset 0px 1px 0px 0px rgba(233,237,233,1);
      -moz-box-shadow: inset 0px 1px 0px 0px rgba(233,237,233,1);
      box-shadow: inset 0px 1px 0px 0px rgba(233,237,233,1);
    }`}
`;

export const AccentText = styled.div`
  font-weight: ${theme.fontWeight.medium};
`;

export const TableShadowContainer = styled.div<{
  $withPagination?: boolean;
  $shadow: boolean;
  $nested: boolean;
}>`
  border-top-left-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
  border-top-right-radius: ${({ $nested }) => ($nested ? 0 : "8px")};
  overflow: hidden;

  box-shadow: ${({ $shadow }) => $shadow && theme.shadow.table};

  border-bottom-left-radius: ${({ $withPagination, $nested }) =>
    $withPagination ? 0 : $nested ? 0 : "8px"};

  border-bottom-right-radius: ${({ $withPagination, $nested }) =>
    $withPagination ? 0 : $nested ? 0 : "8px"};
`;

const tableImageStyles = `
  height: 40px;
  margin-top: -4px;
  margin-bottom: -4px;
  width: 40px;
  border-radius: 4px;
  border: 1px solid ${theme.color.borderLight};
  background-color: ${theme.color.white};
`;

export const TableImage = styled.img`
  ${tableImageStyles}
  display: block;
  object-fit: cover;
`;

export const MockedImage = styled.div`
  ${tableImageStyles}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FiltersDropdownLabel = styled.div`
  margin-left: 8px;
`;
