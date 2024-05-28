// Lib
import { Navigate, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import { ConfigProvider } from "antd";
// Context
import { NotificationProvider } from "context/NotificationsContext";
// Hooks
import { useAppSelector } from "hooks/redux";
// Selectors
import { getUserPermissions, isAuth } from "redux/selectors";
// Theme
import { config } from "theme";
import { LOGIN, ADMIN_ROUTES, sidebarMenuItems } from "consts";
// Utils
import { token } from "utils/handleToken";
import {
  checkAdminMenuPermissions,
  checkAdminRoutesPermissions,
} from "utils/checkAdminPermissions";
// Components
import { AuthRequired, Layout, Me } from "components";
import { Login } from "pages";
// Styles
import { AppContainer, GlobalStyles } from "styles";

export const App = () => {
  const isAuthorized = useAppSelector(isAuth);
  const userPermissions = useAppSelector(getUserPermissions);

  const userAuthorized = isAuthorized && !!token.access.get();

  const ROUTES = checkAdminRoutesPermissions({
    permissions: userPermissions,
    routes: ADMIN_ROUTES,
  });

  const sideBarMenu = checkAdminMenuPermissions({
    menuItems: sidebarMenuItems.admin,
    permissions: userPermissions,
  });

  const redirectPath = userAuthorized ? sideBarMenu[0]?.path || "/404" : LOGIN;

  return (
    <>
      <Reset />
      <GlobalStyles />

      <Me />

      <NotificationProvider>
        <ConfigProvider theme={config}>
          <AppContainer>
            <Routes>
              <Route
                path="*"
                element={<Navigate replace to={redirectPath} />}
              />

              <Route path={LOGIN} element={<Login />} />

              {Object.keys(ROUTES).map(key => {
                const { Component, path } = ROUTES[key];
                return (
                  <Route
                    key={key}
                    path={path}
                    element={
                      <AuthRequired>
                        <Layout sidebarMenuItems={sideBarMenu}>
                          <Component />
                        </Layout>
                      </AuthRequired>
                    }
                  />
                );
              })}
            </Routes>
          </AppContainer>
        </ConfigProvider>
      </NotificationProvider>
    </>
  );
};
