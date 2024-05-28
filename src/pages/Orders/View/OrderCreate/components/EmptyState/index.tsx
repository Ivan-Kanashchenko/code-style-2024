// Lib
import { FC, ReactNode } from "react";
// Styled
import { Typography } from "styled/Typography";
import { EmptyIconContainer, EmptyStateWrapper } from "./styled";

interface EmptyStateProps {
  Icon: ReactNode;
  title: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ Icon, title }) => {
  return (
    <EmptyStateWrapper>
      <EmptyIconContainer>{Icon}</EmptyIconContainer>
      <Typography.TitleThin>{title}</Typography.TitleThin>
    </EmptyStateWrapper>
  );
};
