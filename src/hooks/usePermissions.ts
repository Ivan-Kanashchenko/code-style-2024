import { getPermissions } from "redux/selectors";
import { useAppSelector } from "./redux";
import { permissionsMapper } from "utils/mappers";
import { useMemo } from "react";

export const usePermissions = () => {
  const user = useAppSelector(getPermissions);

  return useMemo(() => permissionsMapper(user), [user]);
};
