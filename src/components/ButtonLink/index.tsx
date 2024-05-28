import { FC } from "react";
import { ButtonProps } from "antd";

import { StyledButton } from "./styled";

interface ButtonLinkProps extends ButtonProps {
  danger?: boolean;
  grey?: boolean;
  iconEnd?: boolean;
  title: string;
  onClick?: () => void;
}

export const ButtonLink: FC<ButtonLinkProps> = ({
  danger,
  grey,
  iconEnd,
  title,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      iconEnd={iconEnd}
      $danger={danger}
      $grey={grey}
      type="link"
      {...props}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      {title}
    </StyledButton>
  );
};
