import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
`;

export const PageFormsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  grid-auto-flow: row;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const AreaWrapper = styled.div<{ $available: "tablet" | "laptop" }>`
  display: ${({ $available }) => ($available === "laptop" ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;

  @media screen and (max-width: 1280px) {
    display: ${({ $available }) => ($available === "tablet" ? "flex" : "none")};
  }
`;
