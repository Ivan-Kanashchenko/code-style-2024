import { Permission } from "consts/permissions";
// Types
import { SidebarMenuItemsType } from "types/common";
// Icons
import { ManageAccountsIcon, OrdersIcon, SettingsIcon } from "icons";

export const sidebarMenuItems: SidebarMenuItemsType = {
  admin: [
    {
      key: "orders",
      Icon: OrdersIcon,
      label: "Orders",
      path: "/orders",
      type: "link",
      access: [Permission.OrdersGet],
    },
    {
      key: "roles",
      Icon: ManageAccountsIcon,
      label: "Roles",
      path: "/roles",
      type: "link",
      access: [Permission.RolesGet],
    },
    {
      key: "settings",
      Icon: SettingsIcon,
      label: "Settings",
      path: "/settings",
      type: "link",
      access: [Permission.SettingsGet],
    },
  ],
};
