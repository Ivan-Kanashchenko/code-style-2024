// Lib
import { createApi } from "@reduxjs/toolkit/query/react";
// Consts
import { endpoints } from "consts";
// Types
import { Coupon } from "types/coupons";
// Helpers
import { generateRequestUrl } from "helpers/dataHelpers";
// Utils
import { coreQuery } from "utils/baseQuery";
import { couponMapper } from "utils/mappers";

export const couponsAPI = createApi({
  reducerPath: "couponsAPI",
  baseQuery: coreQuery(),
  tagTypes: ["coupons"],

  endpoints: build => ({
    validateCoupon: build.query<
      Coupon,
      { customerId: string; couponCode: string }
    >({
      query: ({ customerId, couponCode }) => ({
        url: generateRequestUrl(`${endpoints.coupons}/validate/${customerId}`, {
          couponCode,
        }),
        method: "GET",
      }),
      transformResponse: (response: Coupon) => couponMapper(response),
    }),
  }),
});

export const { useLazyValidateCouponQuery } = couponsAPI;
