// Lib
import { FC } from "react";
// Components
import { Switch } from "../Switch";
import { NumericInput } from "../NumericInput";
import { Select } from "../Select";
// Styles
import { Typography } from "styled/Typography";
import { ErrorMessage, PhoneCompact } from "../styled";

import { FlexContainer } from "styled/Box";

interface PhoneInputProps {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  toggle?: {
    label: string;
    value: boolean;
    setToggleValue: (value: boolean) => void;
  };
  phone: string;
  phoneCode: string;
  phoneCodes: { value: string; label: string }[];
  setPhone: (phone: string) => void;
  setPhoneCode: (phoneCode: string) => void;
  errorMessage?: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  loading,
  disabled,
  label,
  toggle,
  phone,
  phoneCode,
  phoneCodes,
  setPhone,
  setPhoneCode,
  errorMessage,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <FlexContainer $align="center" $justify="space-between">
        {!!label && <Typography.Label>{label}</Typography.Label>}

        {!!toggle && (
          <Switch
            label={toggle.label}
            labelPosition="left"
            formLabel
            overForm
            loading={loading}
            disabled={disabled}
            checked={toggle.value}
            onChange={checked => toggle.setToggleValue(checked)}
          />
        )}
      </FlexContainer>

      <PhoneCompact>
        <Select
          phone
          disabled={loading || disabled}
          value={phoneCode}
          options={phoneCodes}
          onChange={setPhoneCode}
          status={errorMessage && "error"}
        />

        <NumericInput
          phone
          disabled={loading || disabled}
          value={phone}
          fieldChange={setPhone}
          fieldError={!!errorMessage}
        />
      </PhoneCompact>

      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
};
