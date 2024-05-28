// Lib
import { FC } from "react";
// Types
import { FilterField, FilterOption } from "types/tableFilters";
// Theme
import { theme } from "theme";
// Helpers
import { getFormatedInputPrefix } from "../helpers";
// Styled
import { FlexContainer } from "styled/Box";
import { FilterInput } from "../styled";

interface InputFilterProps {
  name: string;
  value: string;
  filters: FilterOption[];
  setFilterValue: (value: string, name: string) => void;
}

export const InputFilter: FC<InputFilterProps> = ({
  name,
  value,
  filters,
  setFilterValue,
}) => {
  return (
    <FilterInput
      $inputType={FilterField.INPUT}
      prefix={getFormatedInputPrefix(filters, name)}
      value={value}
      onChange={e => setFilterValue(e.target.value, name)}
      suffix={
        <FlexContainer $align="center">
          <div
            style={{
              height: 30,
              borderLeft: `1px solid ${theme.color.borderMedium}`,
            }}
          />
        </FlexContainer>
      }
    />
  );
};
