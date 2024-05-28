import styled from "styled-components";
import { theme } from "theme";

const primaryFont = `
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.base};
  color: ${theme.color.white};
`;

const secondaryFont = `
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.base};
  line-height: ${theme.lineHeight.base};
  color: ${theme.color.text.primary2};
`;

interface WrapperProps {
  type: "primary" | "outlined" | "borderless";
  status: "success" | "warning" | "neutral" | "danger";
  borderRadius?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  width: fit-content;
  max-height: 28px;

  ${({ type, status }) => {
    if (type === "primary") {
      return ` 
        background: ${theme.color.status[status]};
        border-radius: 4px;
        ${primaryFont}
        `;
    }
    if (type === "outlined") {
      return ` 
        border: 1px solid ${theme.color.borderLight};
        border-radius: 4px;
        ${secondaryFont}
        `;
    }

    return ` 
    background: ${theme.color.status[status]};
    border-radius: 4px;
    ${secondaryFont}
    `;
  }}
`;

export const Marker = styled.div<WrapperProps>`
  ${({ type }) => type === "primary" && `display: none`}

  ${({ type, status }) => {
    if (type === "outlined") {
      return `
      width: 8px;
      height: 8px;
      background: ${theme.color.status[status]};
      border-radius: 50%;`;
    }
  }}
`;
