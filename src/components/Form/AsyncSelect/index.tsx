// Lib
import { FC, forwardRef } from "react";
import { SelectProps as AntDSelectProps, RefSelectProps } from "antd";
import { ControllerFieldState } from "react-hook-form";
// Styled
import { Typography } from "styled/Typography";
import { SelectField, ErrorMessage } from "../styled";

export interface AsyncSelectProps extends AntDSelectProps {
  phone?: boolean;
  required?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
  styles?: object;
}

export const AsyncSelect: FC<AsyncSelectProps> = forwardRef<
  RefSelectProps,
  AsyncSelectProps
>(({ required, phone, label, fieldError, fieldState, ...props }, ref) => {
  const error = fieldError || fieldState?.error?.message || false;

  return (
    <div>
      {!!label && (
        <Typography.Label>
          {label}
          {!!required && "*"}
        </Typography.Label>
      )}
      <SelectField
        ref={ref}
        $phone={phone}
        status={!!error && "error"}
        {...props}
      />
      {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
});

AsyncSelect.displayName = "Select";
