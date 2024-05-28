// Types
import { EFilterDateValue } from "types/common";
import {
  FilterCustomDate,
  FilterField,
  FilterOption,
  FilterStateItem,
} from "types/tableFilters";
// Constants
import { DAY_MONTH_DATE, DAY_MONTH_YEAR_DATE } from "consts";
// Helpers
import { dateTransform } from "helpers/dataHelpers";
// Icons
import { DoneBlackIcon } from "icons";
// Components
import { Checkbox } from "components/Form";
// Styled
import { FlexContainer } from "styled/Box";
import { CheckboxLabelText } from "./styled";

export const getFilterDropdownOptions = (
  filters: FilterOption[],
  selected: FilterStateItem[],
  filterName: string,
) => {
  const filter = filters.find(filter => filter.key === filterName);

  if (!filter) return null;

  switch (filter.field) {
    case FilterField.DATE_RANGE:
    case FilterField.MULTISELECT_SINGLE_DATE:
      return filter.options.map(field => {
        const selectedValue =
          selected.find((f: FilterStateItem) => f?.name === filterName)
            ?.value === field.type;

        return {
          value: field.type,
          label: (
            <>
              <FlexContainer $align="center" $justify="space-between">
                <div>{field.label}</div>
                {selectedValue ? <DoneBlackIcon /> : null}
              </FlexContainer>
            </>
          ),
        };
      });

    case FilterField.SELECT:
      return filter.options.map(field => {
        const selectedValue =
          selected.find((f: FilterStateItem) => f?.name === filterName)
            ?.value === field.type;

        return {
          value: field.type,
          label: (
            <>
              <FlexContainer $align="center" $justify="space-between">
                <div>{field.label}</div>
                {selectedValue ? <DoneBlackIcon /> : null}
              </FlexContainer>
            </>
          ),
        };
      });

    case FilterField.MULTISELECT:
      return filter.options.map(field => {
        const selectedValue = selected
          .find((f: FilterStateItem) => f?.name === filterName)
          ?.value.includes(field.type);

        return {
          value: field.type,
          label: (
            <FlexContainer>
              <Checkbox value={field.type} checked={selectedValue} />
              <CheckboxLabelText>{field.label}</CheckboxLabelText>
            </FlexContainer>
          ),
        };
      });

    default:
      return [];
  }
};

export const isRageDatePicker = (
  filters: FilterOption[],
  filterName: string,
) => {
  const filter = filters.find(filter => filter.key === filterName);

  if (filter?.field === FilterField.DATE_RANGE) {
    return true;
  }

  return false;
};

export const isDatePicker = (filters: FilterOption[], filterName: string) => {
  const filter = filters.find(filter => filter.key === filterName);

  if (filter?.field === FilterField.DATE) {
    return true;
  }

  return false;
};

export const isMultiSingleDatePicker = (
  filters: FilterOption[],
  filterName: string,
) => {
  const filter = filters.find(filter => filter.key === filterName);

  if (filter?.field === FilterField.MULTISELECT_SINGLE_DATE) {
    return true;
  }

  return false;
};

export const isInputSelect = (filters: FilterOption[], filterName: string) => {
  const filter = filters.find(filter => filter.key === filterName);

  if (filter?.field === FilterField.INPUT_SELECT) {
    return true;
  }

  return false;
};

export const getFormatedValue = (
  filters: FilterOption[],
  filterName: string,
  value: string,
  subValue: FilterCustomDate,
) => {
  const filter = filters.find(filter => filter.key === filterName);

  if (!filter) return null;

  const isSelect =
    filter.field === FilterField.DATE_RANGE ||
    filter.field === FilterField.DATE ||
    filter.field === FilterField.MULTISELECT ||
    filter.field === FilterField.MULTISELECT_SINGLE_DATE ||
    filter.field === FilterField.SELECT;

  if (isSelect) {
    if (filter.field === FilterField.DATE_RANGE) {
      if (value === EFilterDateValue.CUSTOM) {
        return `${filter.label}: after ${
          dateTransform({
            date: subValue?.date?.start,
            format: DAY_MONTH_DATE,
          }) || ""
        } - ${
          dateTransform({
            date: subValue?.date?.end,
            format: DAY_MONTH_DATE,
          }) || ""
        }`;
      }
    }

    if (filter.field === FilterField.MULTISELECT_SINGLE_DATE) {
      if (value === EFilterDateValue.CUSTOM) {
        return `${filter.label}: after ${
          dateTransform({
            date: subValue?.date?.start,
            format: DAY_MONTH_YEAR_DATE,
          }) || ""
        }`;
      }
    }

    if (filter.field === FilterField.DATE) {
      return `${filter.label} ${
        dateTransform({ date: value, format: DAY_MONTH_YEAR_DATE }) || ""
      }`;
    }

    if (filter.field === FilterField.MULTISELECT) {
      const fieldValue = filter.options.filter(o => value.includes(o.type));

      return `${filter.label}: ${fieldValue.map(el => el.label).join(", ")}`;
    }

    const fieldValue = filter.options.find(o => o.type === value)?.label || "";

    return `${filter?.label}: ${fieldValue}`;
  }

  return `${filter?.label}: ${value}`;
};

export const getFormatedInputPrefix = (
  filters: FilterOption[],
  filterName: string,
) => {
  const filter = filters.find(filter => filter.key === filterName);

  return `${filter.label}:`;
};
