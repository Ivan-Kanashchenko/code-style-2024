// Lib
import { FC } from "react";
// Styled
import { StyledAvatarImage, StyledAvatarPlaceholder } from "styled/Box";

interface AvatarProps {
  image?: string;
  name?: string;
  size?: "xl";
}

export const Avatar: FC<AvatarProps> = ({ image, name, size }) => {
  if (!name) {
    return null;
  }
  if (image) {
    return <StyledAvatarImage src={image} size={size} />;
  }

  return (
    <StyledAvatarPlaceholder $size={size}>
      {Array.from(name as string)[0].toUpperCase()}
    </StyledAvatarPlaceholder>
  );
};
