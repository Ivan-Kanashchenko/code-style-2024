import { RootState } from "store";
import { ETable } from "types/tableFilters";

export const getTableFilters = (state: RootState) => state.tableFilters;

export const getOrdersFilters = (state: RootState) =>
  state.tableFilters[ETable.Orders];

export const getCustomersFilters = (state: RootState) =>
  state.tableFilters[ETable.Customers];

export const getCustomerOrdersFilters = (state: RootState) =>
  state.tableFilters[ETable.CustomerOrders];

export const getCustomerTransactionsFilters = (state: RootState) =>
  state.tableFilters[ETable.CustomerTransactions];
