import { FC } from "react";
import { ButtonProps } from "antd";

import { StyledButton } from "./styled";

interface FilledButtonLinkProps extends ButtonProps {
  title: string;
  onClick?: () => void;
}

export const FilledButtonLink: FC<FilledButtonLinkProps> = ({
  title,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
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
