// Lib
import { FC, forwardRef } from "react";
import { DatePickerProps as AntDDatePickerProps } from "antd";
import { ControllerFieldState } from "react-hook-form";
// Styled
import { InputContainer, StyledDatePicker } from "./styled";
import { Typography } from "styled/Typography";
import { ErrorMessage } from "../styled";

interface DPickerProps {
  required?: boolean;
  label?: string;
  isDisabled?: boolean;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
}

export const DatePicker: FC<DPickerProps & AntDDatePickerProps> = forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  DPickerProps & AntDDatePickerProps
>(({ required, label, isDisabled, fieldError, fieldState, ...props }, ref) => {
  const error = fieldError || fieldState?.error?.message || false;

  return (
    <InputContainer>
      {!!label && (
        <Typography.Label>
          {label}
          {!!required && "*"}
        </Typography.Label>
      )}

      <StyledDatePicker
        ref={ref}
        {...props}
        disabled={isDisabled}
        status={!!error && "error"}
      />

      {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
});

DatePicker.displayName = "DatePicker";
