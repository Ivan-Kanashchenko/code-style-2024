// Lib
import styled from "styled-components";
// Theme
import { theme } from "theme";
// Components
import { Typography } from "styled/Typography";

export const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputsContainer = styled(TitlesContainer)`
  gap: 16px;
`;

export const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
  padding: 48px;
  background-color: ${theme.color.white};
  box-shadow: ${theme.shadow.table};
  border-radius: 16px;
`;

export const Heading = styled(Typography.H1)`
  text-align: center;
`;

export const Title = styled(Typography.Title)`
  text-align: center;
`;
