import { generateRequestUrl } from "helpers/dataHelpers";
// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Types
import { UrlQueryParams } from "types/common";
import {
  CreateOrderDeliveryManualRequestDto,
  CreateOrderDeliveryManualResponseDto,
  CreateOrderRequestDto,
  CreateOrderResponseDto,
  GetOrdersResponseDto,
  OrderResponseDto,
  ScheduleOrdersSettingsDto,
} from "types/orders";
// Helpers
import { ordersUrlBuilder } from "./urlBuilder/orders";
// Utils
import { coreQuery } from "utils/baseQuery";
import {
  createOrderPayloadMapper,
  orderMapper,
  ordersMapper,
} from "utils/mappers";
import { endpoints } from "consts";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: coreQuery(),
  tagTypes: ["orders", "order", "schedule-orders-settings"],

  endpoints: build => ({
    getOrders: build.query<GetOrdersResponseDto, { query: UrlQueryParams }>({
      query: ({ query }) => {
        return {
          url: ordersUrlBuilder.getOrders({ query }),
          method: "GET",
        };
      },
      transformResponse: (response: GetOrdersResponseDto) =>
        ordersMapper(response),
      providesTags: ["orders"],
    }),
    getOrder: build.query<OrderResponseDto, { id: string }>({
      query: ({ id }) => {
        return {
          url: ordersUrlBuilder.getOrder({ id }),
          method: "GET",
        };
      },
      transformResponse: (response: OrderResponseDto) => orderMapper(response),
      providesTags: ["order"],
    }),
    getScheduleOrdersSettings: build.query<ScheduleOrdersSettingsDto, void>({
      query: () => ({
        url: `${endpoints.scheduleOrders}/settings`,
        method: "GET",
      }),
      providesTags: ["schedule-orders-settings"],
    }),
    updateScheduleOrdersSettings: build.mutation<
      ScheduleOrdersSettingsDto,
      ScheduleOrdersSettingsDto
    >({
      query: data => ({
        url: `${endpoints.scheduleOrders}/settings`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["schedule-orders-settings"],
    }),
    createOrderDeliveryManual: build.mutation<
      CreateOrderDeliveryManualResponseDto,
      CreateOrderDeliveryManualRequestDto
    >({
      query: ({ customerId, ...data }) => ({
        url: generateRequestUrl(endpoints.deliveriesManual, { customerId }),
        method: "POST",
        data,
      }),
    }),
    createOrder: build.mutation<CreateOrderResponseDto, CreateOrderRequestDto>({
      query: ({ customerId, ...data }) => ({
        url: generateRequestUrl(endpoints.orders, { customerId }),
        method: "POST",
        data: createOrderPayloadMapper(data),
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useGetOrderQuery,
  useLazyGetScheduleOrdersSettingsQuery,
  useUpdateScheduleOrdersSettingsMutation,
  useCreateOrderMutation,
  useCreateOrderDeliveryManualMutation,
} = ordersAPI;
