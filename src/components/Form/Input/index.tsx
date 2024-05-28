// Lib
import { forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";
import { InputProps as AntInputProps, InputRef } from "antd";
// Styles
import { Typography } from "styled/Typography";
import { ErrorMessage, InputField } from "../styled";

interface InputProps extends AntInputProps {
  required?: boolean;
  isDisabled?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
}

export const Input = forwardRef<InputRef, InputProps>(
  ({ required, label, isDisabled, fieldError, fieldState, ...props }, ref) => {
    const error = fieldError || fieldState?.error?.message || false;

    return (
      <div>
        {!!label && (
          <Typography.Label>
            {label}
            {!!required && "*"}
          </Typography.Label>
        )}

        <InputField
          ref={ref}
          disabled={isDisabled}
          {...props}
          status={!!error && "error"}
        />

        {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

Input.displayName = "Input";
