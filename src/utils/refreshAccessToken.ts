import { AxiosResponse } from "axios";

import { endpoints } from "consts";

import { token } from "./handleToken";

import { store } from "store";

import { userLogout } from "redux/slices";
import { axiosInstanceRaw } from "./axios";

export const refreshAccessToken = async (): Promise<string> => {
  const access = token.access.get();
  const refresh = token.refresh.get();

  return axiosInstanceRaw
    .post(endpoints.refreshToken, {
      refreshToken: refresh.token,
    })
    .then((response: AxiosResponse) => {
      const newAccessToken: string = response.data.accessToken;

      token.access.set(newAccessToken, access.storage);

      return newAccessToken;
    })
    .catch(error => {
      if (error) {
        store.dispatch(userLogout());
      }

      throw error;
    });
};
