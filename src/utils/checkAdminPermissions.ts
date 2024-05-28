import { NOT_FOUND_ROUTES, Route } from "consts";
import { SidebarMenuItemType } from "types/common";

const hasMainPages = (mainObject: Record<string, Route>): boolean => {
  if (Object.keys(mainObject).length === 0) {
    return false;
  }

  for (const key in mainObject) {
    if (mainObject[key] && mainObject[key].type === "main") {
      return true;
    }
  }
  return false;
};

type CheckUserAdminPermissions = {
  permissions: { name: string }[];
  routes: Record<string, Route>;
};

export const checkAdminRoutesPermissions = ({
  permissions,
  routes,
}: CheckUserAdminPermissions): Record<string, Route> => {
  const userPermissions = permissions.map(({ name }) => name);
  const filteredRoutes = {};

  for (const routeKey in routes) {
    const route = routes[routeKey];

    if (typeof route.access === "boolean" && route.access === true) {
      filteredRoutes[routeKey] = route;
    } else if (
      Array.isArray(route.access) &&
      route.access.some(permission => userPermissions.includes(permission))
    ) {
      filteredRoutes[routeKey] = route;
    }
  }

  if (!hasMainPages(filteredRoutes)) {
    return NOT_FOUND_ROUTES;
  }

  return filteredRoutes;
};

type CheckUserAdminMenuPermissions = {
  permissions: { name: string }[];
  menuItems: SidebarMenuItemType[];
};

export const checkAdminMenuPermissions = ({
  menuItems,
  permissions,
}: CheckUserAdminMenuPermissions) => {
  const userPermissions = permissions.map(({ name }) => name);

  const filteredMenuItems = menuItems
    .map(item => {
      if (
        item.access === true ||
        (Array.isArray(item.access) &&
          item.access.some(permission => userPermissions.includes(permission)))
      ) {
        return item;
      }

      if (item.access === false) {
        return null;
      }

      if (item?.list) {
        const list = item?.list.filter(
          el =>
            el?.access === true ||
            (Array.isArray(el?.access) &&
              el.access.some(permission =>
                userPermissions.includes(permission),
              )),
        );

        if (list?.length === 0) {
          return null;
        }
        return { ...item, list };
      }
      return null;
    })
    .filter(Boolean);

  return filteredMenuItems;
};
