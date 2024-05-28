// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { SetSettingsRequestDto, SettingsResponseDto } from "types/settings";
// Utils
import { paymentQuery } from "utils/baseQuery";
import { minValuesMapper, minValuesPayloadMapper } from "utils/mappers";

import { endpoints } from "consts";

export const settingsAPI = createApi({
  reducerPath: "settingsAPI",
  baseQuery: paymentQuery(),
  tagTypes: ["settings"],

  endpoints: build => ({
    getSettings: build.query<SettingsResponseDto, void>({
      query: () => ({
        url: endpoints.settings,
        method: "GET",
      }),
      transformResponse: (response: SettingsResponseDto) =>
        minValuesMapper(response),
      providesTags: ["settings"],
    }),
    updateSettings: build.mutation<SettingsResponseDto, SetSettingsRequestDto>({
      query: data => ({
        url: endpoints.settings,
        method: "PUT",
        data: minValuesPayloadMapper(data),
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useLazyGetSettingsQuery,
  useUpdateSettingsMutation,
} = settingsAPI;
