// Lib
import { FC } from "react";
import { MenuProps } from "antd";
// Hooks
import { useAppDispatch, useAppSelector } from "hooks/redux";
// Actions
import { userLogout } from "redux/slices";
// Selectors
import { getUserEmail } from "redux/selectors";
// Icons
import { ArrowDownIcon, AvatarIcon } from "icons";
// Styled
import {
  ControlsContainer,
  HeaderContainer,
  UserTitle,
  Dropdown,
  Avatar,
} from "./styled";

export const Header: FC = () => {
  const userEmail = useAppSelector(getUserEmail);

  const dispatch = useAppDispatch();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      onClick: () => dispatch(userLogout()),
    },
  ];

  return (
    <HeaderContainer>
      <div>logo</div>

      <ControlsContainer>
        <Dropdown items={items} trigger={["click"]}>
          <a onClick={e => e.preventDefault()}>
            <Avatar size={42} icon={<AvatarIcon width="40" height="40" />} />
            <UserTitle>{userEmail || "user-test@gmail.com"}</UserTitle>{" "}
            <ArrowDownIcon />
          </a>
        </Dropdown>
      </ControlsContainer>
    </HeaderContainer>
  );
};
