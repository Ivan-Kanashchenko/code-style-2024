import { RootState } from "store";

export const getUserEmail = (state: RootState) => state.user.user.email;

export const getUser = (state: RootState) => state.user.user;

export const getUserRole = (state: RootState) => state.user.user.role.name;

export const getUserPermissions = (state: RootState) =>
  state.user.user.role.permissions;

export const getPermissions = (state: RootState) => state.user.user;
