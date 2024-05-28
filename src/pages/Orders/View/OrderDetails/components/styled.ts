import styled from "styled-components";
import { theme } from "theme";
import { FlexContainer } from "styled/Box";

const imageStyles = `
  display: block;
  height: 64px;
  width: 64px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.base};
`;

export const MenuItem = styled(FlexContainer)`
  border-radius: ${theme.borderRadius.base};
  border: 1px solid ${theme.color.borderLight};
`;

export const Image = styled.img`
  ${imageStyles}
`;

export const ImagePlaceholder = styled.div`
  ${imageStyles}
`;
