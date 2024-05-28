// Lib
import { forwardRef } from "react";
import { SelectProps as AntDSelectProps, RefSelectProps } from "antd";
import { ControllerFieldState } from "react-hook-form";
// Styled
import { Typography } from "styled/Typography";
import { SearchSelectField, ErrorMessage } from "../styled";

export interface SearchProductsSelectProps extends AntDSelectProps {
  required?: boolean;
  label?: string;
  fieldState?: ControllerFieldState;
  fieldError?: boolean | string;
  styles?: object;
}

export const SearchProductsSelect = forwardRef<
  RefSelectProps,
  SearchProductsSelectProps
>(({ required, label, fieldError, fieldState, ...props }, ref) => {
  const error = fieldError || fieldState?.error?.message || false;

  return (
    <div>
      {!!label && (
        <Typography.Label>
          {label}
          {!!required && "*"}
        </Typography.Label>
      )}

      <SearchSelectField
        ref={ref}
        showSearch
        allowClear
        status={!!error && "error"}
        filterOption={(input, option) =>
          (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase())
        }
        {...props}
      />

      {typeof error === "string" && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
});

SearchProductsSelect.displayName = "SearchProductsSelect";
