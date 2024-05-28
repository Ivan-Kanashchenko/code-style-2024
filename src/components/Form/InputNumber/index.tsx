// Lib
import { forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";
import { InputNumberProps as AntInputProps } from "antd";
// Styles
import { Typography } from "styled/Typography";
import { ErrorMessage, InputFieldNumber } from "../styled";

interface InputNumberProps extends AntInputProps {
  required?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ required, label, fieldError, fieldState, ...props }, ref) => {
    const error = fieldError || fieldState?.error?.message || false;

    return (
      <div>
        {!!label && (
          <Typography.Label>
            {label}
            {!!required && "*"}
          </Typography.Label>
        )}

        <InputFieldNumber ref={ref} {...props} status={!!error && "error"} />

        {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

InputNumber.displayName = "InputNumber";
