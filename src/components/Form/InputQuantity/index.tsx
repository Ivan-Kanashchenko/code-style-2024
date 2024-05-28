// Lib
import { forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";
import { InputNumberProps as AntInputProps, Space } from "antd";
// Icons
import { MinusIcon, PlusIcon } from "icons";
// Styles
import { Typography } from "styled/Typography";
import { ErrorMessage, InputFieldNumber } from "../styled";
import { ControlButton } from "./styled";

interface InputQuantityProps extends AntInputProps {
  required?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
}

export const InputQuantity = forwardRef<HTMLInputElement, InputQuantityProps>(
  (
    { required, label, fieldError, fieldState, value, onChange, ...props },
    ref,
  ) => {
    const error = fieldError || fieldState?.error?.message || false;

    const increase = () => {
      if (typeof value === "number") {
        onChange(++value);
      }
    };

    const decrease = () => {
      if (typeof value === "number" && value > 1) {
        onChange(--value);
      }
    };

    return (
      <div>
        {!!label && (
          <Typography.Label>
            {label}
            {!!required && "*"}
          </Typography.Label>
        )}

        <Space.Compact style={{ width: 136 }}>
          <ControlButton
            icon={<MinusIcon />}
            shadow={"none"}
            onClick={decrease}
          />

          <InputFieldNumber
            ref={ref}
            $quantity
            controls={false}
            precision={0}
            step={1}
            min={1}
            value={value}
            onChange={onChange}
            {...props}
            status={!!error && "error"}
          />

          <ControlButton
            icon={<PlusIcon />}
            shadow={"none"}
            onClick={increase}
          />
        </Space.Compact>

        {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

InputQuantity.displayName = "InputNumber";
