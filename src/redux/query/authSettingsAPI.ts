// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  AddPurposeRequestDto,
  PurposeOptionResponseDto,
  SetSettingsRequestDto,
  SettingsResponseDto,
  UpdatePurposeRequestDto,
} from "types/authSettings";
// Utils
import { authQuery } from "utils/baseQuery";
import { purposeOptionsMapper } from "utils/mappers";

import { endpoints } from "consts";

export const authSettingsAPI = createApi({
  reducerPath: "authSettingsAPI",
  baseQuery: authQuery(),
  tagTypes: ["authSettings", "purposeSettings"],

  endpoints: build => ({
    getAuthSettings: build.query<SettingsResponseDto, void>({
      query: () => ({
        url: endpoints.authSettings,
        method: "GET",
      }),
      providesTags: ["authSettings"],
    }),
    updateAuthSettings: build.mutation<
      SettingsResponseDto,
      SetSettingsRequestDto
    >({
      query: data => ({
        url: endpoints.authSettings,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["authSettings"],
    }),
    getPurposeOptions: build.query<PurposeOptionResponseDto[], void>({
      query: () => ({
        url: `${endpoints.authSettings}/purpose/`,
        method: "GET",
      }),
      transformResponse: (response: PurposeOptionResponseDto[]) =>
        purposeOptionsMapper(response),
      providesTags: ["purposeSettings"],
    }),
    createPurposeOption: build.mutation<
      PurposeOptionResponseDto,
      AddPurposeRequestDto
    >({
      query: data => ({
        url: `${endpoints.authSettings}/purpose/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["purposeSettings"],
    }),
    updatePurposeOption: build.mutation<
      PurposeOptionResponseDto,
      UpdatePurposeRequestDto
    >({
      query: ({ id, ...data }) => ({
        url: `${endpoints.authSettings}/purpose/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["purposeSettings"],
    }),
    removePurposeOption: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${endpoints.authSettings}/purpose/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["purposeSettings"],
    }),
  }),
});

export const {
  useLazyGetAuthSettingsQuery,
  useUpdateAuthSettingsMutation,
  useGetPurposeOptionsQuery,
  useCreatePurposeOptionMutation,
  useUpdatePurposeOptionMutation,
  useRemovePurposeOptionMutation,
} = authSettingsAPI;
