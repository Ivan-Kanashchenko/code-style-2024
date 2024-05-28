// Lib
import { FC } from "react";
import { TabsProps } from "antd/es/tabs";
// Styled
import { StyledTabs } from "./styled";

export const Tabs: FC<TabsProps> = ({ ...props }) => {
  return <StyledTabs {...props} />;
};
