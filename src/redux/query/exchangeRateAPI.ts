// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  ExchangeRateResponseDto,
  SetExchangeRateRequestDto,
} from "types/exchangeRate";
// Utils
import { paymentQuery } from "utils/baseQuery";

import { endpoints } from "consts";

export const exchangeRateAPI = createApi({
  reducerPath: "exchangeRateAPI",
  baseQuery: paymentQuery(),
  tagTypes: ["exchangeRate"],

  endpoints: build => ({
    getExchangeRate: build.query<ExchangeRateResponseDto, void>({
      query: () => ({
        url: endpoints.exchangeRate,
        method: "GET",
      }),
      providesTags: ["exchangeRate"],
    }),
    updateExchangeRate: build.mutation<
      ExchangeRateResponseDto,
      SetExchangeRateRequestDto
    >({
      query: data => ({
        url: endpoints.exchangeRate,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["exchangeRate"],
    }),
  }),
});

export const { useLazyGetExchangeRateQuery, useUpdateExchangeRateMutation } =
  exchangeRateAPI;
