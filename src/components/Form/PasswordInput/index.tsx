// Lib
import { forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";
import { InputProps as AntInputProps, InputRef } from "antd";
// Styles
import { Typography } from "styled/Typography";
import { ErrorMessage, InputFieldPassword } from "../styled";
import { InvisibleIcon, VisibleIcon } from "./styled";

interface InputProps extends AntInputProps {
  isDisabled?: boolean;
  required?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
}

export const PasswordInput = forwardRef<InputRef, InputProps>(
  ({ label, required, isDisabled, fieldError, fieldState, ...props }, ref) => {
    const error = fieldError || fieldState.error?.message || false;

    return (
      <div>
        {!!label && (
          <Typography.Label>
            {label}
            {!!required && "*"}
          </Typography.Label>
        )}

        <InputFieldPassword
          ref={ref}
          {...props}
          status={!!error && "error"}
          disabled={isDisabled}
          iconRender={visible =>
            visible ? <VisibleIcon /> : <InvisibleIcon />
          }
        />

        {!!error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
