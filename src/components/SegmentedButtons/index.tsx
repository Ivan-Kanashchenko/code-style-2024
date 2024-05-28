// Lib
import { FC } from "react";
import { Segmented } from "antd";
// Styled
import { StyledSegmented, Wrapper } from "./styled";

type SegmentedProps = typeof Segmented;

interface SegmentedButtonsProps extends Omit<SegmentedProps, "$$typeof"> {
  value: string | number;
  setValue: (args: string | number) => void;
  options: { label: string; value: string }[];
}

export const SegmentedButtons: FC<SegmentedButtonsProps> = ({
  value,
  setValue,
  options,
  ...props
}) => {
  return (
    <Wrapper>
      <StyledSegmented
        options={options}
        value={value}
        onChange={value => setValue(value)}
        {...props}
      />
    </Wrapper>
  );
};
