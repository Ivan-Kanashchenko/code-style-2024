import { styled } from "styled-components";
import { FlexContainer, InputsGridContainer } from "styled/Box";

export const Wrapper = styled(FlexContainer)`
  gap: 24px;

  @media screen and (max-width: 1135px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const MainFormWrapper = styled(FlexContainer)`
  width: calc(100% - 384px);

  @media screen and (max-width: 1135px) {
    width: 100%;
  }
`;

export const CheckBoxContainer = styled(InputsGridContainer)<{
  $gridRows: number;
}>`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${({ $gridRows }) =>
    $gridRows && `repeat(${$gridRows}, minmax(10px, 1fr));`};
  grid-auto-flow: column;
  align-items: center;

  @media (max-width: 1320px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;
