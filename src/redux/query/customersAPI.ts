// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { UrlQueryParams } from "types/common";
import {
  CustomerProfileResponseDto,
  GetCustomerMenuResponseDto,
  GetCustomersAddressResponseDto,
  GetCustomersResponseDto,
} from "types/customers";
// Helpers
import { customersUrlBuilder } from "./urlBuilder/customers";
// Utils
import { coreQuery } from "utils/baseQuery";
import { customerMenuMapper, customersMapper } from "utils/mappers";

export const customersAPI = createApi({
  reducerPath: "customersAPI",
  baseQuery: coreQuery(),
  tagTypes: ["customers", "customer"],

  endpoints: build => ({
    getCustomers: build.query<
      GetCustomersResponseDto,
      { query: UrlQueryParams }
    >({
      query: ({ query }) => ({
        url: customersUrlBuilder.getCustomers({ query }),
        method: "GET",
      }),
      transformResponse: (response: GetCustomersResponseDto) =>
        customersMapper(response),
      providesTags: ["customers"],
    }),
    getCustomer: build.query<CustomerProfileResponseDto, { id: string }>({
      query: ({ id }) => ({
        url: customersUrlBuilder.getCustomer({ id }),
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    getCustomerAddresses: build.query<
      GetCustomersAddressResponseDto[],
      { id: string }
    >({
      query: ({ id }) => ({
        url: customersUrlBuilder.getCustomerAddresses({ id }),
        method: "GET",
      }),
    }),
    getCustomerMenu: build.query<
      GetCustomerMenuResponseDto,
      { id: string; query: UrlQueryParams }
    >({
      query: ({ id }) => ({
        url: customersUrlBuilder.getCustomerMenu({ id }),
        method: "GET",
      }),
      transformResponse: (response: GetCustomerMenuResponseDto) =>
        customerMenuMapper(response),
    }),
  }),
});

export const {
  useGetCustomerMenuQuery,
  useGetCustomersQuery,
  useLazyGetCustomersQuery,
  useLazyGetCustomerQuery,
  useLazyGetCustomerAddressesQuery,
} = customersAPI;
