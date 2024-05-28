// Lib
import { FC, ReactNode } from "react";
// Hooks
import { useAppSelector } from "hooks";
// Selectors
import { isUserSideBarOpenSelector } from "redux/selectors/ui";
import { SidebarMenuItemType } from "types/common";
// Components
import { Header, Navbar } from "./components";
// Styled
import { AntDLayout, ContentContainer, Wrapper } from "./styled";

interface LayoutProps {
  sidebarMenuItems: SidebarMenuItemType[];
  children: ReactNode;
}

export const SIDEBAR_WIDTH_OPEN = 248;
export const SIDEBAR_WIDTH_COLLAPSED = 80;

export const Layout: FC<LayoutProps> = ({ sidebarMenuItems, children }) => {
  const collapsed = useAppSelector(isUserSideBarOpenSelector);

  return (
    <Wrapper>
      <Header />

      <AntDLayout hasSider>
        {!!sidebarMenuItems.length && (
          <Navbar collapsed={collapsed} sidebarMenuItems={sidebarMenuItems} />
        )}

        <AntDLayout
          className="site-layout"
          style={{
            marginLeft: !sidebarMenuItems.length
              ? 0
              : collapsed
              ? SIDEBAR_WIDTH_COLLAPSED
              : SIDEBAR_WIDTH_OPEN,
            transition: "margin 0.2s",
          }}
        >
          <ContentContainer>{children}</ContentContainer>
        </AntDLayout>
      </AntDLayout>
    </Wrapper>
  );
};
