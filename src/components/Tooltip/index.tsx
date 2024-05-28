import { TooltipProps as AntDTooltipProps, Tooltip as AntDTooltip } from "antd";
import { FC } from "react";
import { theme } from "theme";

const customOverlayStyle = {
  maxWidth: "280px",
};
const customOverlayInnerStyle = {
  background: "white",
  maxWidth: "280px",
  padding: "16px",
  color: "black",
  fontWeight: theme.fontWeight.regular,
  fontSize: theme.fontSize.md,
  lineHeight: theme.lineHeight.md,
};

interface TooltipProps {
  custom?: boolean;
}

export const Tooltip: FC<TooltipProps & AntDTooltipProps> = ({
  custom,
  ...props
}) => {
  return (
    <AntDTooltip
      overlayStyle={custom && customOverlayStyle}
      overlayInnerStyle={custom && customOverlayInnerStyle}
      {...props}
    ></AntDTooltip>
  );
};
