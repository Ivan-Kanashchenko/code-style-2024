// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  GetTimeSlotsResponseDto,
  UpdateTimeSlotsRequestDto,
  UpdateTimeSlotsResponseDto,
} from "types/timeSlots";
// Utils
import { coreQuery } from "utils/baseQuery";

import { endpoints } from "consts";

export const timeSlotsAPI = createApi({
  reducerPath: "timeSlotsAPI",
  baseQuery: coreQuery(),
  tagTypes: ["time-slots"],

  endpoints: build => ({
    getTimeSlots: build.query<GetTimeSlotsResponseDto, void>({
      query: () => ({
        url: endpoints.timeSlots,
        method: "GET",
      }),
      providesTags: ["time-slots"],
    }),

    updateTimeSlots: build.mutation<
      UpdateTimeSlotsResponseDto,
      UpdateTimeSlotsRequestDto
    >({
      query: data => ({
        url: endpoints.timeSlots,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["time-slots"],
    }),
  }),
});

export const { useGetTimeSlotsQuery, useUpdateTimeSlotsMutation } =
  timeSlotsAPI;
