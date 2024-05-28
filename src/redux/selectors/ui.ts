import { RootState } from "store";

export const isUserSideBarOpenSelector = (state: RootState) =>
  state.ui.isSideBarOpen;
