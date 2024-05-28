// Lib
import { FC, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// Hooks
import { useAppDispatch } from "hooks";
// Actions
import { setIsUserSideBarOpen } from "redux/slices";
// Selectors
// Types
import { MenuProps } from "antd";
import { SidebarMenuItemType } from "types/common";
// Icons
import { CollapseIcon } from "icons";
// Styled
import { CollapseMenu, Menu, Sidebar } from "./styled";

export const SIDEBAR_WIDTH_OPEN = 248;

type TMenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: TMenuItem[],
  type?: "group",
): TMenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as TMenuItem;
}

interface NavbarProps {
  collapsed: boolean;
  sidebarMenuItems: SidebarMenuItemType[];
}

export const Navbar: FC<NavbarProps> = ({ collapsed, sidebarMenuItems }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  //scroll to top after change route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleCollapse = () => {
    dispatch(setIsUserSideBarOpen(!collapsed));
  };

  const items: TMenuItem[] = sidebarMenuItems.map(
    ({ Icon, label, path, type, list, key }) => {
      if (type === "link") {
        return getItem(<NavLink to={path}>{label}</NavLink>, key, <Icon />);
      }
      if (type === "list") {
        return getItem(
          label,
          key,
          <Icon />,
          list.map(({ label, path, key }) =>
            getItem(<NavLink to={path}>{label}</NavLink>, key),
          ),
        );
      }
    },
  );

  const collapse = [getItem("Collapse", "collapse", <CollapseIcon />)];

  const selected = pathname.split("/");

  return (
    <Sidebar
      width={SIDEBAR_WIDTH_OPEN}
      collapsible
      trigger={null}
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      <Menu
        selectedKeys={selected}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />

      <CollapseMenu
        $сollapsebutton
        selectedKeys={[]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={collapse}
        onClick={handleCollapse}
      />
    </Sidebar>
  );
};
