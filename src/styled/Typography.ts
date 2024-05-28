import styled from "styled-components";

import { theme } from "theme";

const H1 = styled.h1`
  font-family: "Inter";
  font-size: ${theme.fontSize.heading};
  line-height: ${theme.lineHeight.heading};
  font-weight: ${theme.fontWeight.medium};
`;
const H2 = styled.h2`
  font-family: "Inter";
  font-size: ${theme.fontSize.subheading};
  line-height: ${theme.lineHeight.subheading};
  font-weight: ${theme.fontWeight.semiBold};
`;

const H3 = styled.h3`
  font-family: "Inter";
  font-size: ${theme.fontSize.blockheading};
  line-height: ${theme.lineHeight.subheading};
  font-weight: ${theme.fontWeight.semiBold};

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

const Title = styled.p`
  font-family: "Inter";
  font-size: ${theme.fontSize.md};
  line-height: ${theme.lineHeight.md};
  font-weight: ${theme.fontWeight.medium};
`;

const TitleThin = styled(Title)`
  font-weight: ${theme.fontWeight.regular};
`;

const Description = styled.p`
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.base};
`;

const DescriptionThin = styled(Description)`
  font-weight: ${theme.fontWeight.regular};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.base};

  color: ${theme.color.text.tertiary};
`;

export const SelectedItems = styled(Description)`
  color: ${theme.color.text.primary2};
`;

export const Typography = {
  H1,
  H2,
  H3,
  Title,
  TitleThin,
  Description,
  DescriptionThin,
  Label,
  SelectedItems,
};
