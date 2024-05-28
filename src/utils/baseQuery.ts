import type { AxiosRequestConfig, AxiosError, AxiosInstance } from "axios";

import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  axiosAuthInstance,
  axiosCoreInstance,
  axiosPaymentInstance,
} from "./axios";
import {
  API_AUTH_BASE_URL,
  API_CORE_BASE_URL,
  API_PAYMENT_BASE_URL,
} from "./config";

interface RequestParams {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

const createQuery = (axiosAPI: AxiosInstance, baseUrl: string) => {
  return (): BaseQueryFn<RequestParams, unknown, unknown> =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await axiosAPI({
          url: `${baseUrl}/${url}`,
          method,
          data,
          params,
          headers,
        });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
};

export const authQuery = createQuery(axiosAuthInstance, API_AUTH_BASE_URL);
export const coreQuery = createQuery(axiosCoreInstance, API_CORE_BASE_URL);
export const paymentQuery = createQuery(
  axiosPaymentInstance,
  API_PAYMENT_BASE_URL,
);
