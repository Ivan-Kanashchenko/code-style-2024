// Lib
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
// Hooks
import { useAppSelector } from "hooks/redux";
// Selectors
import { isAuth } from "redux/selectors";
// Constants
import { LOGIN } from "consts";
// Utils
import { token } from "utils/handleToken";

interface AuthRequiredProps {
  children: ReactNode;
}

export const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const isAuthorized = useAppSelector(isAuth);
  const location = useLocation();

  const userAuth = isAuthorized && !!token.access.get();

  if (!userAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
