// Lib
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// Api
import { ordersAPI } from "redux/query/ordersAPI";
import { authMeAPI } from "redux/query/authMeAPI";
import { permissionsAPI } from "redux/query/permissionsAPI";
import { customersAPI } from "redux/query/customersAPI";
import { exchangeRateAPI } from "redux/query/exchangeRateAPI";
import { balanceExpirationAPI } from "redux/query/balanceExpirationAPI";
import { settingsAPI } from "redux/query/settingsAPI";
import { authSettingsAPI } from "redux/query/authSettingsAPI";
import { rolesAPI } from "redux/query/rolesAPI";
import { usersAPI } from "redux/query/usersAPI";
import { locationsAPI } from "redux/query/locationsAPI";
import { timeSlotsAPI } from "redux/query/timeSlotsAPI";
import { cashPaymentsSettingsAPI } from "redux/query/cashPaymentsSettingsAPI";
import { referralsApi } from "redux/query/referralsAPI";
import { couponsAPI } from "redux/query/couponsAPI";

// Selectors
import {
  authSliceReducer,
  uiSliceReducer,
  userSliceReducer,
  tableFiltersSliceReducer,
} from "redux/slices";
// Types
import { AuthState } from "types/auth";
import { UiState } from "types/ui";
import { userState } from "types/users";
import { TableFiltersState } from "types/tableFilters";
// Utils
import { token } from "utils/handleToken";

const LOGOUT_ACTIONS = ["auth/userLogout"];

const reducers = combineReducers({
  auth: authSliceReducer,
  user: userSliceReducer,
  ui: uiSliceReducer,
  tableFilters: tableFiltersSliceReducer,
  [ordersAPI.reducerPath]: ordersAPI.reducer,
  [permissionsAPI.reducerPath]: permissionsAPI.reducer,
  [authMeAPI.reducerPath]: authMeAPI.reducer,
  [customersAPI.reducerPath]: customersAPI.reducer,
  [exchangeRateAPI.reducerPath]: exchangeRateAPI.reducer,
  [balanceExpirationAPI.reducerPath]: balanceExpirationAPI.reducer,
  [settingsAPI.reducerPath]: settingsAPI.reducer,
  [authSettingsAPI.reducerPath]: authSettingsAPI.reducer,
  [rolesAPI.reducerPath]: rolesAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [locationsAPI.reducerPath]: locationsAPI.reducer,
  [timeSlotsAPI.reducerPath]: timeSlotsAPI.reducer,
  [cashPaymentsSettingsAPI.reducerPath]: cashPaymentsSettingsAPI.reducer,
  [referralsApi.reducerPath]: referralsApi.reducer,
  [couponsAPI.reducerPath]: couponsAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = (state, action) => {
  if (LOGOUT_ACTIONS.includes(action.type)) {
    state = undefined;
    token.clear();
  }

  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      ordersAPI.middleware,
      permissionsAPI.middleware,
      authMeAPI.middleware,
      customersAPI.middleware,
      exchangeRateAPI.middleware,
      balanceExpirationAPI.middleware,
      settingsAPI.middleware,
      authSettingsAPI.middleware,
      rolesAPI.middleware,
      usersAPI.middleware,
      locationsAPI.middleware,
      timeSlotsAPI.middleware,
      cashPaymentsSettingsAPI.middleware,
      referralsApi.middleware,
      couponsAPI.middleware,
    ),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = {
  auth: AuthState;
  ui: UiState;
  user: userState;
  tableFilters: TableFiltersState;
};
