// Lib
import { FC } from "react";
// Icons
import { LockIcon } from "icons";
// Styled
import { Typography } from "styled/Typography";
import { BlockedIconContainer, Wrapper } from "./styled";

export const BlockedState: FC = () => {
  return (
    <Wrapper>
      <BlockedIconContainer>
        <LockIcon />
      </BlockedIconContainer>

      <Typography.TitleThin>
        Select store location and delivery address
      </Typography.TitleThin>
    </Wrapper>
  );
};
