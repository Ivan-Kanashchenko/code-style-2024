// Lib
import { FC } from "react";
// Icons
import { LoaderIcon } from "icons";
// Styled
import { LoaderContainer } from "./styled";

export const Loader: FC = () => {
  return (
    <LoaderContainer $align="center" $justify="center">
      <LoaderIcon />
    </LoaderContainer>
  );
};
