import { styled } from "styled-components";
import { ContentBox } from "styled/Box";

export const RulesWrapper = styled(ContentBox)`
  gap: 20px;
  width: 360px;
  flex-direction: column;
  height: fit-content;

  @media screen and (max-width: 1135px) {
    width: 100%;
  }
`;
