// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { UrlQueryParams } from "types/common";
import { GetReferralsResponseDto, ReferralsSettingsDto } from "types/referrals";
// Helpers
import { referralsUrlBuilder } from "./urlBuilder/referrals";
// Utils
import { coreQuery } from "utils/baseQuery";
import { endpoints } from "consts";
import {
  referralListMapper,
  referralSettingsMapper,
  referralSettingsPayloadMapper,
} from "utils/mappers";

export const referralsApi = createApi({
  reducerPath: "referralsApi",
  baseQuery: coreQuery(),
  tagTypes: ["refferals"],

  endpoints: build => ({
    getReferrals: build.query<
      GetReferralsResponseDto,
      { id: string; query: UrlQueryParams }
    >({
      query: ({ id, query }) => ({
        url: referralsUrlBuilder.getReferralsList({ id, query }),
        method: "GET",
      }),
      providesTags: ["refferals"],
      transformResponse: (response: GetReferralsResponseDto) =>
        referralListMapper(response),
    }),
    getReferralsSettings: build.query<ReferralsSettingsDto, void>({
      query: () => ({
        url: `${endpoints.referrals}/settings`,
        method: "GET",
      }),
      providesTags: ["refferals"],
      transformResponse: (response: ReferralsSettingsDto) =>
        referralSettingsMapper(response),
    }),
    updateReferralsSettings: build.mutation<
      ReferralsSettingsDto,
      ReferralsSettingsDto
    >({
      query: data => ({
        url: `${endpoints.referrals}/settings`,
        method: "POST",
        data: referralSettingsPayloadMapper(data),
      }),
    }),
  }),
});

export const {
  useGetReferralsQuery,
  useLazyGetReferralsSettingsQuery,
  useUpdateReferralsSettingsMutation,
} = referralsApi;
