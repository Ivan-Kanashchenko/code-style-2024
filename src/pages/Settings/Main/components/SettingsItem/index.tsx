// Lib
import { FC, ReactNode } from "react";
// Styled
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { Description } from "./styled";

interface SettingsItemProps {
  title: string;
  description?: string;
  width?: string;
  children: ReactNode;
}

export const SettingsItem: FC<SettingsItemProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <FlexContainer
      $fullwidth
      $gap={4}
      $align="center"
      $justify="space-between"
      $padding="12px 0"
    >
      <FlexContainer $column $align="flex-start" $width="calc(100% - 210px)">
        <Typography.Title>{title}</Typography.Title>

        {!!description && <Description>{description}</Description>}
      </FlexContainer>

      <FlexContainer $width="200px" $align="center" $justify="flex-end">
        {children}
      </FlexContainer>
    </FlexContainer>
  );
};

export default SettingsItem;
