// Lib
import { FC } from "react";
// Types
import { SvgIconConstituentValues } from "types/common";
// Theme
import { theme } from "theme";
// Styled
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { IconContainer, Message } from "./styled";

interface NoItemsContentProps {
  message: string;
  description?: string;
  Icon: FC<SvgIconConstituentValues>;
  iconCircleBgColor?: string;
}

export const NoItemsContent: FC<NoItemsContentProps> = ({
  message,
  description,
  Icon,
  iconCircleBgColor,
}) => {
  return (
    <FlexContainer
      $fullwidth
      $column
      $align="center"
      $justify="center"
      $gap={8}
      $padding="24px"
    >
      <IconContainer bgColor={iconCircleBgColor}>
        <Icon fill={theme.color.text.tertiary} />
      </IconContainer>

      <Message>{message}</Message>

      <Typography.DescriptionThin>{description}</Typography.DescriptionThin>
    </FlexContainer>
  );
};
