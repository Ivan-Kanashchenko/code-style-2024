// Lib
import { FC, useEffect, useState } from "react";
import { Spin } from "antd";
// Api
// Hooks
// Actions
// Selectors
// Types
import { FilterStateItem } from "types/tableFilters";
import { TableHeaderProps } from "../../types";
// Theme
import { theme } from "theme";
// Constants
// Helpers
import { createFiltersDropdown, updateFiltersData } from "../../helpers";
// Utils
// Icons
import { TuneBlackFilterIcon } from "icons";
// Layouts
// Components
import { Badge, DropDown } from "components";
import { SearchInput } from "components/Form";
import { FiltersBar } from "../FiltersBar";
// Styled
import { Typography } from "styled/Typography";
import { FlexContainer } from "styled/Box";
import { Button } from "styled/Buttons";
import { HeaderTabs, RedDot, Wrapper } from "./styled";

export const TableHeader: FC<TableHeaderProps> = ({
  isLoading,
  totalCount,
  search,
  filter,
  tabs,
  suffix,
  leftTitle,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const filtersData = filter?.include
    ? updateFiltersData(filter.filters, filter?.include)
    : filter?.filters;

  const dropdownFilters = !!filter && createFiltersDropdown(filtersData);

  const isAnyFilterExist = !!filter?.selected?.length;

  useEffect(() => {
    setCollapsed(!isAnyFilterExist);
  }, [isAnyFilterExist]);

  const setFilter = filterData => {
    if (
      !filter?.selected?.find(
        (f: FilterStateItem) => f?.name === filterData.key,
      )
    ) {
      const data: FilterStateItem[] = [
        ...filter.selected,
        {
          name: filterData.key,
          value: "",
          field: filtersData.find(filter => filter.key === filterData.key)
            .field,
        },
      ];

      filter?.setValue(data);
    }
  };

  const handleCollapseFilters = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Wrapper $column $isSelectedFilter={!!filter?.selected}>
      <FlexContainer $align="center" $justify="space-between">
        {leftTitle && <Typography.H2>{leftTitle}</Typography.H2>}

        {!!tabs && (
          <HeaderTabs items={tabs?.items} onTabClick={e => tabs.setTab(e)} />
        )}

        {totalCount ? (
          <Typography.Description>
            Total records
            <Badge
              title={`${totalCount}`}
              bgColor="white"
              textColor={theme.color.black}
              border={`1px solid ${theme.color.borderLight}`}
              style={{ marginLeft: 8 }}
            />
          </Typography.Description>
        ) : (
          <div />
        )}

        <FlexContainer $gap={10}>
          {!!search && (
            <SearchInput
              value={search.value}
              setValue={search.setValue}
              placeholder={search.placeholder}
            />
          )}

          {!!filter?.filters.length && isAnyFilterExist ? (
            <Button.SubHeading
              icon={<TuneBlackFilterIcon />}
              onClick={handleCollapseFilters}
            >
              Filter
              <RedDot />
            </Button.SubHeading>
          ) : (
            !!filter?.filters.length && (
              <DropDown
                items={dropdownFilters}
                trigger={["click"]}
                onClick={setFilter}
              >
                <Button.SubHeading icon={<TuneBlackFilterIcon />}>
                  Filter
                  {isAnyFilterExist && <RedDot />}
                </Button.SubHeading>
              </DropDown>
            )
          )}
          {!!suffix && suffix}
        </FlexContainer>
      </FlexContainer>

      {!!filter && (
        <Spin indicator={null} spinning={isLoading}>
          <FiltersBar
            collapsed={collapsed}
            value={filter?.value}
            selected={filter.selected}
            filters={filtersData}
            setValue={filter.setValue}
          />
        </Spin>
      )}
    </Wrapper>
  );
};
