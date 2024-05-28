// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  PaymentsSettingsResponseDto,
  SetPaymentsSettingsRequestDto,
} from "types/paymentsSettings";
// Utils
import { paymentQuery } from "utils/baseQuery";

import { endpoints } from "consts";
import { cashPaymentsMapper, cashPaymentsPayloadMapper } from "utils/mappers";

export const cashPaymentsSettingsAPI = createApi({
  reducerPath: "cashPaymentsSettingsAPI",
  baseQuery: paymentQuery(),

  endpoints: build => ({
    getCashPaymentsSettings: build.query<PaymentsSettingsResponseDto, void>({
      query: () => ({
        url: endpoints.cashPayments,
        method: "GET",
      }),
      transformResponse: (response: PaymentsSettingsResponseDto) =>
        cashPaymentsMapper(response),
    }),
    updateCashPaymentsSettings: build.mutation<
      PaymentsSettingsResponseDto,
      SetPaymentsSettingsRequestDto
    >({
      query: data => ({
        url: endpoints.cashPayments,
        method: "PUT",
        data: cashPaymentsPayloadMapper(data),
      }),
    }),
  }),
});

export const {
  useGetCashPaymentsSettingsQuery,
  useLazyGetCashPaymentsSettingsQuery,
  useUpdateCashPaymentsSettingsMutation,
} = cashPaymentsSettingsAPI;
