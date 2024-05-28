// Lib
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Api
import {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
} from "redux/query/ordersAPI";
// Hooks
import { useNotification, usePermissions, useTable } from "hooks";
// Types
import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { AdditionalFilter, ETable } from "types/tableFilters";
// Constants
import { ADMIN_ROUTES } from "consts";
// Icons
import { DescriptionBlackIcon, PlusIcon } from "icons";
// Utils
import { errorHandler } from "utils/errorHandler";
// Theme
import { theme } from "theme";
// Components
import {
  Export,
  //TODO: remove comment if BE is ready
  // Export,
  Pagination,
  Table,
} from "components";
// Styled
import { FlexContainer, PageWrapper } from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";

import { columns, filtersList } from "./config";

export const Orders: FC = () => {
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const { canOrdersCreate } = usePermissions();

  const {
    sortingOrder,
    sortBy,
    page,
    limit,
    //TODO: remove comment if BE is ready
    // search,
    selectedFilters,
    debouncedSearch,
    debouncedFiltersQuery,
    setPage,
    setLimit,
    //TODO: remove comment if BE is ready
    // setSearch,
    handleSort,
    handleSetTableFilterValues,
  } = useTable({ name: ETable.Orders });

  const {
    data: ordersData,
    isFetching: isLoading,
    error: ordersError,
  } = useGetOrdersQuery(
    {
      query: {
        ...(debouncedFiltersQuery && debouncedFiltersQuery),
        page,
        limit,
        sortBy,
        sortingOrder,
        search: debouncedSearch,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [getExportOrdersData, { isFetching: isExportLoading }] =
    useLazyGetOrdersQuery();

  useEffect(() => {
    if (ordersError) {
      errorHandler({ error: ordersError, openNotification });
    }
  }, [ordersError]);

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: any,
  ) => {
    handleSort(sorter?.field, sorter?.order);
  };

  const createNewOrder = () => {
    navigate(`${ADMIN_ROUTES.ORDERS.path}/create`);
  };

  const onRow = record => {
    return {
      onClick: () => {
        navigate(`${ADMIN_ROUTES.ORDERS.path}/${record.id}`);
      },
    };
  };

  const getExportData = async (): Promise<Record<string, unknown>[]> => {
    try {
      const data = await getExportOrdersData({
        query: {
          ...(debouncedFiltersQuery && debouncedFiltersQuery),
          limit: ordersData.totalCount,
          sortBy,
          sortingOrder,
          search: debouncedSearch,
        },
      }).unwrap();

      return data.items;
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  return (
    <PageWrapper $fullwidth $column>
      <FlexContainer $fullwidth $column $grow={1} $padding="0 0 32px">
        <FlexContainer
          $padding="0 0 24px"
          $align="center"
          $justify="space-between"
        >
          <Typography.H1>Orders</Typography.H1>

          <FlexContainer $gap={10}>
            <Export
              fileName="orders"
              isLoading={isExportLoading}
              isDisabled={!ordersData?.totalCount || isLoading}
              columns={columns}
              getExportData={getExportData}
            />

            {canOrdersCreate && (
              <Button.Heading
                icon={<PlusIcon fill={theme.color.white} />}
                type="primary"
                onClick={createNewOrder}
              >
                New Order
              </Button.Heading>
            )}
          </FlexContainer>
        </FlexContainer>

        <Table
          isLoading={isLoading}
          dataSource={ordersData?.items || []}
          columns={columns}
          empty={{
            icon: DescriptionBlackIcon,
            title: "No order to show.",
            description: "Try changing sections or change the filters",
          }}
          header={{
            //TODO: remove comment if BE is ready
            // search: {
            //   placeholder: "Search customer, mobile number, or order ID",
            //   value: search,
            //   setValue: setSearch,
            // },
            totalCount: ordersData?.totalCount,
            filter: {
              include: [AdditionalFilter.Customer],
              filters: filtersList,
              selected: selectedFilters,
              setValue: handleSetTableFilterValues,
            },
          }}
          onChange={handleTableChange}
          onRow={onRow}
        />
      </FlexContainer>

      <Pagination
        onPage
        padding="12px 16px"
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        totalItems={ordersData?.totalCount}
      />
    </PageWrapper>
  );
};
