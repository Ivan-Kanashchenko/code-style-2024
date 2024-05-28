import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 24px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const MainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: calc(100% - 384px);

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 360px;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
