// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { GetLocationResponseDto } from "types/locations";
// Utils
import { coreQuery } from "utils/baseQuery";

import { endpoints } from "consts";

export const locationsAPI = createApi({
  reducerPath: "locationsAPI",
  baseQuery: coreQuery(),
  tagTypes: ["locations", "location"],

  endpoints: build => ({
    getLocations: build.query<GetLocationResponseDto[], void>({
      query: () => ({
        url: endpoints.locations,
        method: "GET",
      }),

      providesTags: ["locations"],
    }),
  }),
});

export const { useGetLocationsQuery } = locationsAPI;
