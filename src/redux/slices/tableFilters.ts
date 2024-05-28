// Lib
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types
import { FilterStateItem, ETable, TableFiltersState } from "types/tableFilters";

const initialState: TableFiltersState = {
  [ETable.Orders]: [],
  [ETable.Customers]: [],
  [ETable.CustomerOrders]: [],
  [ETable.CustomerTransactions]: [],
  [ETable.Users]: [],
  [ETable.WaitingUsers]: [],
  [ETable.Transactions]: [],
};

export const tableFiltersSlice = createSlice({
  name: "tableFilters",
  initialState,
  reducers: {
    setTableFilters: (
      state,
      action: PayloadAction<{ name: ETable; filters: FilterStateItem[] }>,
    ) => {
      state[action.payload.name] = action.payload.filters;
    },
  },
});

export const { setTableFilters } = tableFiltersSlice.actions;
export const tableFiltersSliceReducer = tableFiltersSlice.reducer;
