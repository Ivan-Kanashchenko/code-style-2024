// Lib
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types
import { User, userState } from "types/users";

const initialState: userState = {
  user: {
    id: null,
    authProviderUID: null,
    phoneNumber: null,
    email: null,
    firstName: null,
    lastName: null,
    role: {
      name: null,
      permissions: [],
    },
    customerActivated: null,
    showDebugLocationScreen: null,
    emailVerified: null,
    referralCode: null,
    isUserInWaitingList: null,
    selectedPackage: null,
    referrerCode: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
