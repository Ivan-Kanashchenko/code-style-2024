import { styled } from "styled-components";

export const Button = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  cursor: pointer;

  background: transparent;

  color: inherit;
  font: inherit;
  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;
