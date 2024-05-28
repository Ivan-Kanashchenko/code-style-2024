// Lib
import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
// Types
import { RangeValue } from "rc-picker/lib/interface";
import { EFilterDateValue } from "types/common";
import {
  FilterCustomDate,
  FilterField,
  FilterOption,
  FilterStateItem,
} from "types/tableFilters";
// Theme
import { theme } from "theme";
// Helpers
import { dateCreate } from "helpers/dataHelpers";
import {
  getFilterDropdownOptions,
  getFormatedValue,
  isDatePicker,
  isInputSelect,
  isMultiSingleDatePicker,
  isRageDatePicker,
} from "../helpers";
// Icons
import { ArrowDropDownBlackIcon, CalendarTodayIcon } from "icons";
// Components
import {
  RangePicker,
  DatePicker as FormDatePicker,
  Input,
} from "components/Form";
// Styled
import { FlexContainer } from "styled/Box";
import {
  CloseButton,
  CloseIcon,
  DatePicker,
  FilterSelect,
  LabelText,
} from "../styled";

interface DropdownFilterProps {
  name: string;
  field: FilterField;
  filters: FilterOption[];
  isOpen: object | Record<string, boolean>;
  selected: FilterStateItem[] | [];
  value: string;
  subValue?: FilterCustomDate;
  setIsOpen: (
    value: React.SetStateAction<object | Record<string, boolean>>,
  ) => void;
  setFilterValue: (
    value: string,
    name: string,
    subValue?: FilterCustomDate,
  ) => void;
}

export const DropdownFilter: FC<DropdownFilterProps> = ({
  name,
  field,
  filters,
  isOpen,
  selected,
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

  const renderPicker = (name: string, subValue) => {
    const selectedFilter = selected.find(
      (f: FilterStateItem) => f?.name === name,
    );
    const isCustom = selectedFilter.value === EFilterDateValue.CUSTOM;
    if (!isCustom) {
      return null;
    }

    const dateChangeHandler = (range: RangeValue<Dayjs>, isDate?: boolean) => {
      const start = dateCreate(range[0]?.second(0)).toISOString();
      const end = dateCreate(range[1]?.second(0)).toISOString();

      setFilterValue(selectedFilter?.value as string, name, {
        [isDate ? "date" : "time"]: { start, end },
      });
    };

    return (
      <div style={{ padding: "0 10px 15px" }}>
        <div>
          <LabelText>Date</LabelText>
          <RangePicker
            allowEmpty={[true, true]}
            format={"DD/MM/YYYY"}
            suffixIcon={<CalendarTodayIcon />}
            value={[
              dateCreate(subValue?.date?.start || null, true),
              dateCreate(subValue?.date?.end || null, true),
            ]}
            onChange={range => dateChangeHandler(range, true)}
          />
          <LabelText>Time</LabelText>
          <RangePicker
            allowEmpty={[true, true]}
            picker="time"
            format={"HH:mm"}
            suffixIcon={<CalendarTodayIcon />}
            value={[
              dateCreate(subValue?.time?.start || null, true),
              dateCreate(subValue?.time?.end || null, true),
            ]}
            onChange={range => dateChangeHandler(range)}
          />
          <CloseButton onClick={() => setIsOpen({ [name]: false })}>
            Close
          </CloseButton>
        </div>
      </div>
    );
  };

  const renderSinglePicker = (name: string, subvalue) => {
    const selectedFilter = selected.find(
      (f: FilterStateItem) => f?.name === name,
    );
    const isCustom = selectedFilter.value === EFilterDateValue.CUSTOM;
    if (!isCustom) {
      return null;
    }

    const dateChange = (date: Dayjs) => {
      if (!date) {
        setFilterValue(selectedFilter.value as string, name, null);
        return;
      }
      setFilterValue(selectedFilter.value as string, name, {
        date: {
          start: dayjs(date)?.toISOString(),
          end: dayjs(date)?.toISOString(),
        },
      });
    };

    return (
      <div style={{ padding: "10px" }}>
        <div>
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={dateChange}
            value={dateCreate(subvalue?.time?.start || null, true)}
          />

          <CloseButton onClick={() => setIsOpen({ [name]: false })}>
            Close
          </CloseButton>
        </div>
      </div>
    );
  };

  const renderDatePicker = (name: string, value: string | null) => {
    const dateChange = (date: Dayjs) => {
      if (!date) {
        setFilterValue("", name);
        return;
      }
      setFilterValue(dayjs(date)?.toISOString() || null, name);
    };

    return (
      <div style={{ padding: "10px" }}>
        <div>
          <FormDatePicker
            format={"DD/MM/YYYY"}
            onChange={dateChange}
            value={value ? dayjs(value) : null}
          />

          <CloseButton onClick={() => setIsOpen({ [name]: false })}>
            Close
          </CloseButton>
        </div>
      </div>
    );
  };

  return (
    <FilterSelect
      $inputType={field}
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
      open={isOpen[name]}
      popupMatchSelectWidth={300}
      onMouseDown={() => setIsOpen({ [name]: true })}
      onBlur={() => {
        if (value === EFilterDateValue.CUSTOM) return;
        if (field === FilterField.DATE) return;

        setIsOpen({ [name]: false });
      }}
      onChange={v => setFilterValue(v, name)}
      value={getFormatedValue(filters, name, value, subValue)}
      options={getFilterDropdownOptions(filters, selected, name)}
      dropdownRender={menu => {
        if (isRageDatePicker(filters, name)) {
          return (
            <>
              {menu}
              {renderPicker(name, subValue)}
            </>
          );
        }

        if (isMultiSingleDatePicker(filters, name)) {
          return (
            <>
              {menu}
              {renderSinglePicker(name, subValue)}
            </>
          );
        }
        if (isInputSelect(filters, name)) {
          return <>{renderInputSelect(name, value)}</>;
        }

        if (isDatePicker(filters, name)) {
          return <>{renderDatePicker(name, value)}</>;
        }

        return <>{menu}</>;
      }}
    />
  );
};
