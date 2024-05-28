// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { UrlQueryParams } from "types/common";
import {
  CreateUserRequestDto,
  GetUsersResponseDto,
  GetWaitingUsersResponseDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from "types/users";
// Helpers
import { usersUrlBuilder } from "./urlBuilder/users";
// Utils
import { authQuery } from "utils/baseQuery";
import { usersMapper } from "utils/mappers";

import { endpoints } from "consts";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: authQuery(),
  tagTypes: ["users"],

  endpoints: build => ({
    getUsers: build.query<GetUsersResponseDto, { query: UrlQueryParams }>({
      query: ({ query }) => ({
        url: usersUrlBuilder.getUsers({ query }),
        method: "GET",
      }),
      transformResponse: (response: GetUsersResponseDto) =>
        usersMapper(response),
      providesTags: ["users"],
    }),
    getUser: build.query<UserResponseDto, { id: string }>({
      query: ({ id }) => ({
        url: `${endpoints.users}/${id}`,
        method: "GET",
      }),
    }),
    createUser: build.mutation<UserResponseDto, CreateUserRequestDto>({
      query: data => ({
        url: endpoints.users,
        method: "POST",
        data,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: build.mutation<UserResponseDto, UpdateUserRequestDto>({
      query: ({ id, ...data }) => ({
        url: `${endpoints.users}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${endpoints.users}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    getWaitingUsers: build.query<
      GetWaitingUsersResponseDto,
      { query: UrlQueryParams }
    >({
      query: ({ query }) => ({
        url: usersUrlBuilder.getWaitingUsers({ query }),
        method: "GET",
      }),

      providesTags: ["users"],
    }),
    updateWaitingUser: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${endpoints.waitingList}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetWaitingUsersQuery,
  useLazyGetWaitingUsersQuery,
  useUpdateWaitingUserMutation,
} = usersAPI;
