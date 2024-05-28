import styled from "styled-components";
import { Typography } from "styled/Typography";
import { theme } from "theme";

export const Description = styled(Typography.DescriptionThin)`
  color: ${theme.color.text.tertiary};
  word-wrap: break-word;
`;
