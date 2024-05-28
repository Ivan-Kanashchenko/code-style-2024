import { Switch as AtnDSwitch, SwitchProps as AntDSwitchProps } from "antd";
import { forwardRef } from "react";
import { Label, SwitchContainer } from "./styled";
import { Typography } from "styled/Typography";

export interface SwitchProps extends AntDSwitchProps {
  formLabel?: boolean;
  overForm?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
}

export const Switch = forwardRef<HTMLElement, SwitchProps>(
  ({ label, labelPosition = "right", formLabel, overForm, ...props }, ref) => {
    return (
      <SwitchContainer $labelPosition={labelPosition}>
        {formLabel ? (
          <Typography.Label>{label}</Typography.Label>
        ) : (
          <Label>{label}</Label>
        )}
        <AtnDSwitch
          ref={ref}
          {...props}
          style={{ marginBottom: overForm ? 3 : 0 }}
        />
      </SwitchContainer>
    );
  },
);

Switch.displayName = "Switch";
