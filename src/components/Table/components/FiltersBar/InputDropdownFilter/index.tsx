// Lib
import { FC } from "react";
// Types
import { FilterField, FilterOption } from "types/tableFilters";
// Theme
import { theme } from "theme";
// Helpers
import { getFormatedValue } from "../helpers";
// Icons
import { ArrowDropDownBlackIcon } from "icons";
// Components
import { Input } from "components/Form";
// Styled
import { FlexContainer } from "styled/Box";
import { CloseIcon, FilterSelect } from "../styled";

interface InputDropdownFilterProps {
  isOpen: boolean;
  name: string;
  filters: FilterOption[];
  value: string;
  subValue: unknown;
  setIsOpen: (value: boolean) => void;
  setFilterValue: (value: string, name: string) => void;
}

export const InputDropdownFilter: FC<InputDropdownFilterProps> = ({
  name,
  isOpen,
  filters,
  value,
  subValue,
  setIsOpen,
  setFilterValue,
}) => {
  const renderInputSelect = (name: string, value) => {
    const onInputChange = e => {
      setFilterValue(e.target.value, name);
    };
    return (
      <div style={{ padding: "10px" }}>
        <div>
          <Input value={value} onChange={onInputChange} />
        </div>
      </div>
    );
  };

  return (
    <FilterSelect
      $inputType={FilterField.INPUT_SELECT}
      suffixIcon={
        <FlexContainer $align="center">
          <ArrowDropDownBlackIcon />
          <div
            style={{
              width: 20,
              height: 30,
              borderLeft: `1px solid ${theme.color.borderMedium}`,
            }}
          />
        </FlexContainer>
      }
      removeIcon={<CloseIcon />}
      open={isOpen}
      popupMatchSelectWidth={300}
      onMouseDown={() => setIsOpen(true)}
      onDropdownVisibleChange={visible => setIsOpen(visible)}
      onChange={v => setFilterValue(v, name)}
      value={getFormatedValue(filters, name, value, subValue)}
      dropdownRender={() => renderInputSelect(name, value)}
    />
  );
};
