// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { User } from "types/users";
// Utils
import { authQuery } from "utils/baseQuery";

import { endpoints } from "consts";

export const authMeAPI = createApi({
  reducerPath: "authMeAPI",
  baseQuery: authQuery(),
  tagTypes: ["authMe"],

  endpoints: build => ({
    getAuthMe: build.query<User, void>({
      query: () => ({
        url: endpoints.me,
        method: "GET",
      }),
      providesTags: ["authMe"],
    }),
  }),
});

export const { useGetAuthMeQuery, useLazyGetAuthMeQuery } = authMeAPI;
