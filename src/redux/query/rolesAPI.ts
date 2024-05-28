// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import {
  CreateRoleRequestDto,
  GetManyRolesResponseDto,
  RoleResponseDto,
  UpdateRoleRequestDto,
} from "types/roles";
// Utils
import { authQuery } from "utils/baseQuery";

import { endpoints } from "consts";

export const rolesAPI = createApi({
  reducerPath: "rolesAPI",
  baseQuery: authQuery(),
  tagTypes: ["roles", "me"],

  endpoints: build => ({
    getRoles: build.query<GetManyRolesResponseDto, void>({
      query: () => ({
        url: endpoints.roles,
        method: "GET",
      }),
      providesTags: ["roles", "me"],
    }),
    createRole: build.mutation<RoleResponseDto, CreateRoleRequestDto>({
      query: data => ({
        url: endpoints.roles,
        method: "POST",
        data,
      }),
      invalidatesTags: ["roles", "me"],
    }),
    updateRole: build.mutation<RoleResponseDto, UpdateRoleRequestDto>({
      query: ({ id, ...data }) => ({
        url: `${endpoints.roles}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["roles", "me"],
    }),
    deleteRole: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${endpoints.roles}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["roles", "me"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesAPI;
