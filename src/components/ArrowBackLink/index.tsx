import { FC, memo } from "react";
import { NavLink } from "react-router-dom";

import { ArrowBackIcon } from "icons";

import { FlexContainer } from "styled/Box";
import { LinkTitle } from "./styled";

interface ArrowBackLinkProps {
  title: string;
  path: string;
}

const ArrowBackLinkComponent: FC<ArrowBackLinkProps> = ({ title, path }) => {
  return (
    <NavLink to={path}>
      <FlexContainer $align="center" $justify="center" $gap={16}>
        <ArrowBackIcon /> <LinkTitle>{title}</LinkTitle>
      </FlexContainer>
    </NavLink>
  );
};

export const ArrowBackLink = memo(ArrowBackLinkComponent);
