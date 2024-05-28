// Lib
import { forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";
import { TextAreaProps as AntDTextAreaProps } from "antd/lib/input";
// Styled
import { Typography } from "styled/Typography";
import { ErrorMessage, TextAreaField } from "../styled";

interface TextAreaProps extends AntDTextAreaProps {
  required?: boolean;
  isDisabled?: boolean;
  label?: string;
  rows?: number;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { required, isDisabled, label, rows = 3, fieldError, fieldState, ...props },
    ref,
  ) => {
    const error = fieldError || fieldState?.error?.message || false;

    return (
      <div>
        {!!label && (
          <Typography.Label>
            {label}
            {!!required && "*"}
          </Typography.Label>
        )}

        <TextAreaField
          ref={ref}
          rows={rows}
          {...props}
          status={!!error && "error"}
          disabled={isDisabled}
        />

        {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
