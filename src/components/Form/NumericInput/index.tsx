// Lib
import { ChangeEvent, forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";
import { InputProps as AntInputProps, InputRef } from "antd";
// Styles
import { Typography } from "styled/Typography";
import { ErrorMessage, InputField } from "../styled";

interface InputProps extends AntInputProps {
  phone?: boolean;
  required?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
  fieldChange?: (args: string) => void;
}

export const NumericInput = forwardRef<InputRef, InputProps>(
  (
    {
      phone,
      required,
      label,
      fieldError,
      fieldState,
      value,
      fieldChange,
      ...props
    },
    ref,
  ) => {
    const error = fieldError || fieldState?.error?.message || false;

    function extractDigitsFromString(str: string): string {
      const digitsOnly = str.replace(/[^\d.]/g, "");

      if (phone) {
        return digitsOnly.replace(/[^\d]/g, "");
      }
      const firstDotIndex = digitsOnly.indexOf(".");
      let formattedDigits = digitsOnly;

      const isDotted = str.split("");

      if (
        isDotted?.length === 2 &&
        isDotted[0] === "0" &&
        isDotted[1] !== "."
      ) {
        return "0";
      }

      if (firstDotIndex !== -1) {
        const beforeDot = digitsOnly.slice(0, firstDotIndex);
        const afterDot = digitsOnly.slice(firstDotIndex + 1);

        if (beforeDot.length > 1 && beforeDot.startsWith("0")) {
          formattedDigits = "0." + afterDot.replace(/\./g, "");
        } else {
          formattedDigits = beforeDot + "." + afterDot.replace(/\./g, "");
        }
      }

      return formattedDigits;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const string = extractDigitsFromString(e.target.value.toString());
      if (string?.length) {
        fieldChange(string);
      } else {
        fieldChange("");
      }
    };

    return (
      <div style={{ width: "100%" }}>
        {!!label && (
          <Typography.Label>
            {label}
            {!!required && "*"}
          </Typography.Label>
        )}

        <InputField
          phone={phone}
          ref={ref}
          {...props}
          value={value}
          onChange={handleChange}
          status={!!error && "error"}
        />

        {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

NumericInput.displayName = "NumericInput";
