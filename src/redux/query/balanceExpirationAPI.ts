// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  BalanceExpirationResponseDto,
  SetBalanceExpirationRequestDto,
} from "types/balanceExpiration";
// Utils
import { paymentQuery } from "utils/baseQuery";

import { endpoints } from "consts";

export const balanceExpirationAPI = createApi({
  reducerPath: "BalanceExpirationAPI",
  baseQuery: paymentQuery(),
  tagTypes: ["balanceExpiration"],

  endpoints: build => ({
    getBalanceExpiration: build.query<BalanceExpirationResponseDto, void>({
      query: () => ({
        url: endpoints.balanceExpiration,
        method: "GET",
      }),
      providesTags: ["balanceExpiration"],
    }),
    updateBalanceExpiration: build.mutation<
      BalanceExpirationResponseDto,
      SetBalanceExpirationRequestDto
    >({
      query: data => ({
        url: endpoints.balanceExpiration,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["balanceExpiration"],
    }),
  }),
});

export const {
  useLazyGetBalanceExpirationQuery,
  useUpdateBalanceExpirationMutation,
} = balanceExpirationAPI;
