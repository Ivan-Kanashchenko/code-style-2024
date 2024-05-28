// Lib
import { createSlice } from "@reduxjs/toolkit";
// Types
import { AuthState } from "types/auth";
// Utils
import { token } from "utils/handleToken";

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: state => {
      state.isAuth = true;
    },
    userLogout: state => {
      token.clear();
      state.isAuth = false;
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
