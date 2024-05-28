import { FC } from "react";

import { Permission } from "./permissions";

import { NotFound, Orders, Roles, Settings } from "pages";

import { OrderDetails } from "pages/Orders/View/OrderDetails";
import { OrderCreate } from "pages/Orders/View/OrderCreate";
import { EditCreateRoles } from "pages/Roles/View/EditCreateRoles";

export interface Route {
  type: "main" | "additional";
  path: string;
  Component: FC;
  access?: boolean | Permission[];
}

export const LOGIN = "/login";

export const NOT_FOUND_ROUTES: Record<string, Route> = {
  NOT_FOUND: { type: "main", path: "/404", Component: NotFound, access: true },
};

export const ADMIN_ROUTES: Record<string, Route> = {
  ORDERS: {
    type: "main",
    path: "/orders",
    Component: Orders,
    access: [Permission.OrdersGet],
  },
  ORDER_DETAILS: {
    type: "additional",
    path: "/orders/:id",
    Component: OrderDetails,
    access: [Permission.OrdersGet],
  },
  ORDER_CREATE: {
    type: "additional",
    path: "/orders/create",
    Component: OrderCreate,
    access: [Permission.OrdersCreate],
  },
  ROLES: {
    type: "main",
    path: "/roles",
    Component: Roles,
    access: [Permission.RolesGet],
  },
  ROLES_CREATE: {
    type: "additional",
    path: "/roles/create",
    Component: EditCreateRoles,
    access: [Permission.RolesCreate],
  },
  ROLES_EDIT: {
    type: "additional",
    path: "/roles/:id",
    Component: EditCreateRoles,
    access: [Permission.RolesUpdate],
  },
  SETTINGS: {
    type: "main",
    path: "/settings",
    Component: Settings,
    access: [Permission.SettingsGet],
  },
};
