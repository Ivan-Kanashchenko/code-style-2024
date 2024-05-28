import axios, { AxiosInstance } from "axios";

import { store } from "store";
import { userLogout } from "redux/slices";

import { token } from "./handleToken";
import { refreshAccessToken } from "./refreshAccessToken";
import {
  API_AUTH_BASE_URL,
  API_CORE_BASE_URL,
  API_PAYMENT_BASE_URL,
} from "./config";

export const CUSTOM_JSON_HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const UNAUTHORIZED = 401;

export const axiosInstanceRaw: AxiosInstance = axios.create({
  baseURL: API_AUTH_BASE_URL,
  headers: CUSTOM_JSON_HEADERS,
});

const axiosInstanceGenerator = (baseUrl?: string) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: CUSTOM_JSON_HEADERS,
  });

  axiosInstance.interceptors.request.use(
    config => {
      const access = token.access.get();

      if (access?.token) {
        config.headers["Authorization"] = `Bearer ${access.token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;

        return refreshAccessToken().then(
          (newAccessToken: string | undefined) => {
            if (newAccessToken) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              return axiosInstance(originalRequest);
            } else {
              store.dispatch(userLogout());
              return Promise.reject(error);
            }
          },
        );
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const axiosAuthInstance = axiosInstanceGenerator(API_AUTH_BASE_URL);
export const axiosCoreInstance = axiosInstanceGenerator(API_CORE_BASE_URL);
export const axiosPaymentInstance =
  axiosInstanceGenerator(API_PAYMENT_BASE_URL);
