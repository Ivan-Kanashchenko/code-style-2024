import {
  Dropdown as AntDDropDown,
  DropdownProps as AntDDropdownProps,
  MenuProps,
} from "antd";
import { FC, ReactElement, ReactNode, cloneElement } from "react";
import { theme } from "theme";

interface DropDownProps {
  items: MenuProps["items"];
  children: ReactNode;
  dropdownRender?: () => ReactNode;
  onClick?: (e) => void;
}

export const DropDown: FC<DropDownProps & AntDDropdownProps> = ({
  items,
  onClick,
  children,
  dropdownRender,
  ...props
}) => {
  const contentStyle = {
    maxWidth: "320px",
  };

  const menuStyle = {
    boxShadow: theme.shadow.bold,
    padding: "8px",
    "ant-dropdown-menu-item": {
      padding: "8px",
    },
  };

  return (
    <AntDDropDown
      menu={{
        onClick,
        items,
      }}
      {...props}
      dropdownRender={menu =>
        (dropdownRender && dropdownRender()) || (
          <div style={contentStyle}>
            {cloneElement(menu as ReactElement, { style: menuStyle })}
          </div>
        )
      }
    >
      {children}
    </AntDDropDown>
  );
};
