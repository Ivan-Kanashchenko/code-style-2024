// Lib
import { FC } from "react";
// Theme
import { theme } from "theme";
// Constants
import { orderStatusColors } from "consts";
// Styled
import { StyledBadge } from "./styled";

interface BadgeProps {
  title: string;
  status?: string;
  bgColor?: string;
  border?: string;
  textColor?: string;
  style?: object;
  capitalize?: boolean;
}

const productStatusColors = {
  active: theme.color.active,
  disabled: theme.color.disabled,
};

export const Badge: FC<BadgeProps> = ({
  capitalize,
  title,
  status,
  bgColor,
  border,
  textColor,
  style,
}) => {
  const isTableStatusBadge = !!status;
  const color =
    textColor || (isTableStatusBadge ? theme.color.white : theme.color.brand);

  const backgroundColor = isTableStatusBadge
    ? orderStatusColors[status] || productStatusColors[status]
    : bgColor || "#d7ded7";

  if (!title) {
    return null;
  }

  return (
    <StyledBadge
      style={style}
      $color={color}
      $backgroundColor={backgroundColor}
      $capitalize={capitalize}
      $isTableStatusBadge={isTableStatusBadge}
      $border={border}
    >
      {title}
    </StyledBadge>
  );
};
