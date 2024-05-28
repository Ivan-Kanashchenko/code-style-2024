import { styled } from "styled-components";
import { Button } from "styled/Buttons";

export const ControlButton = styled(Button.Form)`
  width: 40px;
  height: 40px;
  min-width: 40px;

  :hover,
  :focus {
    z-index: 10;
  }
`;
