// Lib
import { FC, memo } from "react";
// Types
import { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableAction } from "types/common";
import { EmptyMessage, TableHeaderProps } from "./types";
// Helpers
import { createTableColumns } from "./helpers";
// Components
import { Loader } from "components/Loader";
import { TableHeader } from "./components";
// Styled
import { AntTableStyled, TableShadowContainer } from "./styled";
import { NoItemsContent } from "components/NoItemsContent";
import { FlexContainer } from "styled/Box";

export interface ITableProps {
  isLoading?: boolean;
  nested?: boolean;
  wrapTitles?: boolean;
  withPagination?: boolean;
  shadow?: boolean;
  dragRowId?: null | string;
  minWidth?: number;
  accentColumn?: number;
  expandedRows?: React.Key[];
  accentColumnWidth?: string;
  actions?: TableAction[];
  header?: TableHeaderProps;
  empty?: EmptyMessage;
}

{
  /* Unable to use Typescript, Styled Components, and Ant Design (table) together
  GitHub issue https://github.com/styled-components/styled-components/issues/3752 */
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableComponent: FC<ITableProps & TableProps<any>> = ({
  rowKey = "id",
  isLoading = false,
  nested = false,
  shadow = true,
  wrapTitles = true,
  expandedRows = [],
  dragRowId = null,
  minWidth,
  withPagination,
  accentColumn,
  accentColumnWidth,
  header,
  columns,
  actions,
  empty,
  onRow,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnsData: ColumnsType<any> = createTableColumns({
    columns,
    actions,
  });

  const locale = empty && {
    emptyText: (
      <FlexContainer $align="center" $justify="center" $padding="32px 0">
        <NoItemsContent
          Icon={empty.icon}
          message={empty.title}
          description={empty.description}
        />
      </FlexContainer>
    ),
  };

  return (
    <TableShadowContainer
      $withPagination={withPagination}
      $shadow={shadow}
      $nested={nested}
    >
      {header && (
        <TableHeader
          isLoading={isLoading}
          totalCount={header?.totalCount}
          tabs={header.tabs}
          search={header?.search}
          leftTitle={header?.leftTitle}
          suffix={header?.suffix}
          filter={header?.filter}
        />
      )}

      {/* Unable to use Typescript, Styled Components, and Ant Design (table) together
        GitHub issue https://github.com/styled-components/styled-components/issues/3752 */}
      <AntTableStyled<(props: TableProps<any>) => JSX.Element>
        rowKey={rowKey}
        onRow={onRow}
        $minWidth={minWidth}
        $accentColumn={accentColumn}
        $accentColumnWidth={accentColumnWidth}
        $nested={nested}
        $dragRowId={dragRowId}
        $wrapTitles={wrapTitles}
        $clicable={!!onRow}
        $expandedRows={expandedRows}
        $withPagination={withPagination}
        columns={columnsData}
        pagination={false}
        locale={locale}
        loading={{
          spinning: isLoading,
          indicator: (
            <>
              <Loader />
            </>
          ),
        }}
        {...props}
      />
    </TableShadowContainer>
  );
};

export const Table = memo(TableComponent);
