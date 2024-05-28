// Lib
import { FC, forwardRef } from "react";
import { RangePickerProps } from "antd/es/date-picker";
// Styled
import { StyledRangePicker } from "./styled";

interface DPickerProps {
  label?: string;
}

export const RangePicker: FC<DPickerProps & RangePickerProps> = forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  DPickerProps & RangePickerProps
>((props, ref) => {
  return <StyledRangePicker ref={ref} {...props} />;
});

RangePicker.displayName = "RangePicker";
