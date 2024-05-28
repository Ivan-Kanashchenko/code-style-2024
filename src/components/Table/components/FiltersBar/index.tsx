// Lib
import { FC, useState } from "react";
// Types
import {
  FilterCustomDate,
  FilterField,
  FilterStateItem,
} from "types/tableFilters";
import { TableFilters } from "../../types";
// Helpers
import { createFiltersDropdown } from "../../helpers";
// Icons
import { AddIcon } from "icons";
// Components
import { DropDown } from "components";
import { CustomersFilter } from "./CustomersFilter";
import { InputFilter } from "./InputFilter";
import { DropdownFilter } from "./DropdownFilter";
import { InputDropdownFilter } from "./InputDropdownFilter";
// Styled
import { FlexContainer } from "styled/Box";
import { AddFilterButton, CloseIcon, SelectedFilterContainer } from "./styled";
import { UsersFilter } from "./UsersFilter";

export const FiltersBar: FC<TableFilters & { collapsed: boolean }> = ({
  collapsed,
  filters,
  selected,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState<Record<string, boolean> | object>({});

  const setFilterValue = (
    value: string,
    name: string,
    subValue?: FilterCustomDate,
  ) => {
    const filterType = filters.find(filter => filter.key === name)?.field;

    const currentFilter = selected?.find(
      (f: FilterStateItem) => f?.name === name,
    );

    if (filterType === FilterField.INPUT || filterType === FilterField.DATE) {
      setValue([
        ...selected.map((f: FilterStateItem) => {
          if (f.name == currentFilter.name) {
            return {
              ...currentFilter,
              value,
              subValue: subValue
                ? { ...currentFilter.subValue, ...subValue }
                : null,
            };
          }
          return f;
        }),
      ]);
    }

    if (filterType === FilterField.MULTISELECT) {
      if (currentFilter.value.includes(value)) {
        const deselected = [
          ...selected.map((f: FilterStateItem) => {
            if (f.name == currentFilter.name) {
              return {
                ...currentFilter,
                value: [...(currentFilter.value as string[])].filter(
                  v => v !== value,
                ),
              };
            }
            return f;
          }),
        ];

        setValue(deselected);
        return;
      }

      setValue([
        ...selected.map((f: FilterStateItem) => {
          if (f.name == currentFilter.name) {
            return {
              ...currentFilter,
              value: [...(currentFilter.value as string[]), value],
            };
          }
          return f;
        }),
      ]);

      return;
    }

    setValue([
      ...selected.map((f: FilterStateItem) => {
        if (f.name == currentFilter.name) {
          return {
            ...currentFilter,
            value,
            subValue: subValue
              ? { ...currentFilter.subValue, ...subValue }
              : null,
          };
        }
        return f;
      }),
    ]);
  };

  const removeFilter = (name: string) => {
    const newList = selected?.filter(
      (filter: FilterStateItem) => filter?.name !== name,
    );

    setValue(newList);
  };

  const setFilter = filterData => {
    if (!selected?.find((f: FilterStateItem) => f?.name === filterData.key)) {
      const data: FilterStateItem[] = [
        ...selected,
        {
          name: filterData.key,
          value: "",
          field: filters.find(filter => filter.key === filterData.key).field,
        },
      ];

      setValue(data);
    }
  };

  const dropdownFilters = createFiltersDropdown(filters);

  return (
    <FlexContainer
      style={{
        height: collapsed ? "0px" : "67px",
        transition: "height 0.2s",
      }}
    >
      {!collapsed && !!selected.length && (
        <SelectedFilterContainer>
          {selected.map(({ name, value, field, subValue }) => {
            const isDropDown =
              field === FilterField.SELECT ||
              field === FilterField.MULTISELECT ||
              field === FilterField.MULTISELECT_SINGLE_DATE ||
              field === FilterField.DATE_RANGE ||
              field === FilterField.DATE ||
              field === FilterField.BOOLEAN;

            return (
              <FlexContainer
                $align="center"
                style={{ marginLeft: 10, position: "relative" }}
                key={name}
              >
                {isDropDown && (
                  <DropdownFilter
                    name={name}
                    field={field}
                    filters={filters}
                    isOpen={isOpen}
                    selected={selected}
                    value={value}
                    setIsOpen={setIsOpen}
                    setFilterValue={setFilterValue}
                  />
                )}

                {field === FilterField.INPUT_SELECT && (
                  <InputDropdownFilter
                    isOpen={isOpen[name]}
                    name={name}
                    filters={filters}
                    value={value}
                    subValue={subValue}
                    setIsOpen={value => setIsOpen({ [name]: value })}
                    setFilterValue={setFilterValue}
                  />
                )}

                {field === FilterField.CUSTOMER_SELECT && (
                  <CustomersFilter
                    name={name}
                    isOpen={isOpen[name]}
                    field={field}
                    selected={selected}
                    value={value}
                    setIsOpen={value => setIsOpen({ [name]: value })}
                    setFilterValue={setFilterValue}
                  />
                )}
                {field === FilterField.USER_SELECT && (
                  <UsersFilter
                    name={name}
                    isOpen={isOpen[name]}
                    field={field}
                    selected={selected}
                    value={value}
                    setIsOpen={value => setIsOpen({ [name]: value })}
                    setFilterValue={setFilterValue}
                  />
                )}

                {field === FilterField.INPUT && (
                  <InputFilter
                    name={name}
                    value={value}
                    filters={filters}
                    setFilterValue={setFilterValue}
                  />
                )}

                <FlexContainer
                  style={{
                    position: "absolute",
                    right: 4,
                    zIndex: 1,
                  }}
                >
                  <CloseIcon onClick={() => removeFilter(name)} />
                </FlexContainer>
              </FlexContainer>
            );
          })}

          <DropDown
            items={dropdownFilters}
            trigger={["click"]}
            onClick={setFilter}
          >
            <AddFilterButton type="link" icon={<AddIcon />}>
              Add Filter
            </AddFilterButton>
          </DropDown>
        </SelectedFilterContainer>
      )}
    </FlexContainer>
  );
};
