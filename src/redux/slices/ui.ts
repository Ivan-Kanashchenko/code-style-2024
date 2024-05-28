// Lib
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types
import { UiState } from "types/ui";

const initialState: UiState = {
  isSideBarOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsUserSideBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setIsUserSideBarOpen } = uiSlice.actions;
export const uiSliceReducer = uiSlice.reducer;
