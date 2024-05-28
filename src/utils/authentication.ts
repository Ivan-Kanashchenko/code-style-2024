import axios from "axios";
import { axiosAuthInstance } from "./axios";

import { endpoints } from "consts";

import { User } from "types/users";

const FIREBASE_AUTH_URL = `${process.env.REACT_APP_PUBLIC_FIREBASE_ADDRESS}${process.env.REACT_APP_PUBLIC_FIREBASE_TOKEN}`;

export const firebaseAuthentication = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axios.post<{ idToken: string }>(FIREBASE_AUTH_URL, {
      ...credentials,
      returnSecureToken: true,
    });

    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.error?.message?.replaceAll("_", " ") ||
        error?.message,
    );
  }
};

export const apiAuthentication = async (idToken: string) => {
  try {
    const { data } = await axiosAuthInstance.post<{
      user: User;
      accessToken: string;
      refreshToken: string;
    }>(endpoints.signIn, {
      idToken,
    });

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
