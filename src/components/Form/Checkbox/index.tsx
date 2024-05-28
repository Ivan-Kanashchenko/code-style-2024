// Lib
import { forwardRef } from "react";
import { CheckboxProps as AntCheckboxProps, CheckboxRef } from "antd";
// Styles
import { CheckboxField } from "./styled";

interface CheckboxProps extends AntCheckboxProps {
  label?: string;
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <CheckboxField ref={ref} {...props}>
        {label}
      </CheckboxField>
    );
  },
);

Checkbox.displayName = "Checkbox";
