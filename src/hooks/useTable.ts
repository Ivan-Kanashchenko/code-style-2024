// Lib
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Api
// Hooks
import { useAppDispatch, useAppSelector, useDebounce } from "hooks";
// Actions
import { setTableFilters } from "redux/slices/tableFilters";
// Selectors
import { getTableFilters } from "redux/selectors/tableFilters";
// Types
import { Order } from "types/common";
import { ETable, FilterStateItem } from "types/tableFilters";
// Helpers
import { isMatch } from "helpers/dataHelpers";
import { getFiltersQuery } from "helpers/tableFiltersHelpers";

interface Props {
  name: ETable;
  removeQueryParams?: boolean;
}

export const useTable = ({ name, removeQueryParams }: Props) => {
  const tableFilters = useAppSelector(getTableFilters);
  const dispatch = useAppDispatch();

  const [debouncedFiltersQuery, setDebouncedFiltersQuery] = useState<
    Record<string, string | string[]>
  >({});

  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = <T>(name: string, initial: T): T | string =>
    searchParams.get(name) || initial;

  const [sortingOrder, setSortingOrders] = useState<Order>(
    getParams("sortingOrder", "") as Order,
  );
  const [sortBy, setSortBy] = useState<string>(getParams("sortBy", ""));

  const [page, setPage] = useState<number>(() =>
    Number(searchParams.get("page") || 1),
  );

  const [limit, setLimit] = useState<number>(() =>
    Number(searchParams.get("limit") || 10),
  );

  const [search, setSearch] = useState<string>(getParams("search", ""));
  const debouncedSearch = useDebounce<string>(search, 1000);

  const filtersQuery = getFiltersQuery(tableFilters[name]);

  const debouncedFiltersQueryValues = useDebounce<
    Record<string, string | string[]>
  >(filtersQuery, 1000);

  useEffect(() => {
    if (!debouncedFiltersQueryValues && !debouncedFiltersQuery) {
      return;
    }

    if (!isMatch(debouncedFiltersQuery, debouncedFiltersQueryValues)) {
      setPage(1);
      setDebouncedFiltersQuery(debouncedFiltersQueryValues || {});
    }
  }, [debouncedFiltersQueryValues]);

  const checkParams = (filtersParams: string) => {
    if (isMatch(filtersParams, tableFilters[name])) {
      return;
    }

    if (filtersParams) {
      dispatch(setTableFilters({ name, filters: JSON.parse(filtersParams) }));
    }
  };

  useEffect(() => {
    const filtersParams = searchParams.get("filters");

    if (!filtersParams) {
      return;
    }

    checkParams(filtersParams);
  }, []);

  useEffect(() => {
    if (removeQueryParams) {
      return;
    }

    setSearchParams({
      ...(page && { page: page.toString() }),
      ...(limit && { limit: limit.toString() }),
      ...(sortingOrder && { sortingOrder }),
      ...(sortBy && { sortBy }),
      ...(search && { search: debouncedSearch }),
      ...(tableFilters[name]?.length && {
        filters: JSON.stringify(tableFilters[name]),
      }),
    });
  }, [sortingOrder, sortBy, page, limit, debouncedSearch, tableFilters[name]]);

  const handleSort = (field: string, direction: string) => {
    if (!direction) {
      setSortBy("");
      setSortingOrders("");
      return;
    }

    const sortBy =
      direction === "ascend" ? "ASC" : direction === "descend" ? "DESC" : "";

    setSortBy(field);
    setSortingOrders(sortBy);
    setPage(1);
  };

  const handleSetLimit = (limit: number) => {
    setPage(1);
    setLimit(limit);
  };

  const handleSetTableFilterValues = (filters: FilterStateItem[]) => {
    dispatch(setTableFilters({ name, filters }));
  };

  const handleReset = () => {
    setSearch("");
    setLimit(10);
    setPage(1);
    setSortBy("");
    setSortingOrders("");
  };

  return {
    sortingOrder,
    sortBy,
    page,
    limit,
    search,
    selectedFilters: tableFilters[name] || [],
    debouncedSearch,
    debouncedFiltersQuery,
    setSortingOrders,
    setSortBy,
    setPage,
    setLimit: handleSetLimit,
    setSearch,
    handleSort,
    handleReset,
    handleSetTableFilterValues,
  };
};
