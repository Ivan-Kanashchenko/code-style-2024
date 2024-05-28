// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  PermissionsLimitResponseDto,
  UpdatePermissionRequestDto,
} from "types/authSettings";
// Utils
import { authQuery } from "utils/baseQuery";

import { Permission, endpoints } from "consts";

export const permissionsAPI = createApi({
  reducerPath: "permissionsAPI",
  baseQuery: authQuery(),
  tagTypes: ["permissions", "permissions-limit"],

  endpoints: build => ({
    getPermissions: build.query<Permission[], void>({
      query: () => ({
        url: endpoints.permissions,
        method: "GET",
      }),
      providesTags: ["permissions"],
    }),

    getPermissionLimits: build.query<PermissionsLimitResponseDto[], void>({
      query: () => ({
        url: endpoints.permissionsLimit,
        method: "GET",
      }),
      providesTags: ["permissions-limit"],
    }),
    updatePermissionLimits: build.mutation<
      PermissionsLimitResponseDto,
      UpdatePermissionRequestDto
    >({
      query: ({ id, limit }) => ({
        url: `${endpoints.permissions}/${id}`,
        method: "PUT",
        data: { limit },
      }),
      invalidatesTags: ["permissions-limit"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionLimitsQuery,
  useLazyGetPermissionLimitsQuery,
  useUpdatePermissionLimitsMutation,
} = permissionsAPI;
