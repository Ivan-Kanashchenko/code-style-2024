import styled from "styled-components";
import { theme } from "theme";

interface FlexContainerProps {
  $position?: "absolute" | "relative";
  $column?: boolean;
  $wrap?: boolean;
  $gap?: number;
  $fullwidth?: boolean;
  $align?: "center" | "flex-start" | "flex-end";
  $justify?: "center" | "flex-start" | "flex-end" | "space-between";
  $padding?: string;
  $grow?: number;
  $margin?: string;
  $cursor?: "pointer" | "move";
  $width?: string;
  $minWidth?: string;
  $height?: string;
}

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;

  ${({ $position }) => $position && `position: ${$position};`}
  ${({ $align }) => $align && `align-items: ${$align};`}
  ${({ $justify }) => $justify && `justify-content: ${$justify};`}
  ${({ $column }) => $column && `flex-direction: column;`}
  ${({ $gap }) => $gap && `gap: ${$gap}px;`}
  ${({ $fullwidth }) => $fullwidth && `width: 100%;`}
  ${({ $padding }) => $padding && `padding: ${$padding};`}
  ${({ $margin }) => $margin && `margin: ${$margin};`}
  ${({ $grow }) => $grow && `flex-grow: ${$grow};`}
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $cursor }) => $cursor && `cursor: ${$cursor};`}
  ${({ $wrap }) => $wrap && `flex-wrap: wrap;`}
`;

export const ContentBox = styled(FlexContainer)`
  width: 100%;
  background: ${theme.color.white};
  box-shadow: ${theme.shadow.table};
  border-radius: ${theme.borderRadius.base};
  gap: 24px;
  padding: 24px;

  ${({ $gap }) => $gap && `gap: ${$gap}px;`}
  ${({ $padding }) => $padding && `padding: ${$padding};`}
`;

export const SubContentBox = styled(ContentBox)`
  border: 1px solid ${theme.color.borderLight};
  box-shadow: none;
`;

export const PageWrapper = styled(FlexContainer)`
  min-height: 100%;
`;

export const PageHeadingContainer = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
`;

export const PageTitleContainer = styled(FlexContainer)`
  align-items: flex-start;
`;

export const PageButtonsContainer = styled(FlexContainer)`
  gap: 10px;
`;

export const InputsGridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }
`;

export const IconRoundedContainer = styled(FlexContainer)<{
  bgColor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.bgColor || theme.color.background.gray};
  padding: 6px;
`;

export const StyledAvatarPlaceholder = styled.div<{ $size?: "xl" }>`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  background-color: #fa8545;
  color: ${theme.color.white};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
  line-height: ${theme.lineHeight.md};

  ${({ $size }) =>
    $size === "xl" &&
    `height: ${$size}px;
  width: ${$size}px;
  font-size: ${theme.fontSize.subheading};
  `}
`;

export const StyledAvatarImage = styled.img<{ size?: "xl" }>`
  border-radius: 50%;
  height: 28px;
  width: 28px;
  object-fit: cover;
  display: block;

  ${({ size }) =>
    size === "xl" &&
    `height: ${size}px;
  width: ${size}px;`}
`;

export const SummaryItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 16px;

  @media screen and (max-width: 1240px) {
    grid-template-columns: 1fr;
  }
`;

export const HorizontalDevider = styled.div`
  height: 1px;
  background: ${theme.color.borderLight};
`;

export const HorizontalDashedDevider = styled.div`
  height: 0px;
  border: 1px dashed ${theme.color.borderLight};
`;

export const MapContextStyledWrapper = styled.div<{ $isSidebar: boolean }>`
  height: 100%;
  width: 100%;
  overflow: hidden;

  ${({ $isSidebar }) =>
    $isSidebar &&
    `
  min-width: 900px;
  display: grid;
  grid-template-columns: 384px 1fr;

  @media (max-width: 1200px) {
    min-width: 900px;
  }
  `}
`;
