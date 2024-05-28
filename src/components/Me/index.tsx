// Lib
import { FC, useEffect } from "react";
// Api
import { useGetAuthMeQuery } from "redux/query/authMeAPI";
// Hooks
import { useAppDispatch, useAppSelector } from "hooks";
// Actions
import { setUser } from "redux/slices";
// Selectors
import { getUser, isAuth } from "redux/selectors";
// Helpers
import { isMatch } from "helpers/dataHelpers";
// Utils
import { token } from "utils/handleToken";

export const Me: FC = () => {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(isAuth);
  const user = useAppSelector(getUser);

  const userAuthorized = isAuthorized && !!token.access.get();

  const { data } = useGetAuthMeQuery(null, {
    skip: !userAuthorized,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  useEffect(() => {
    if (!userAuthorized) return;

    if (!data) return;

    if (isMatch(user, data)) return;

    dispatch(setUser(data));
  }, [data]);

  return null;
};
