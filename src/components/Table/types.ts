import { FC, ReactNode } from "react";
import { TabsProps } from "antd/es/tabs";

import { SvgIconConstituentValues } from "types/common";
import {
  AdditionalFilter,
  FilterOption,
  FilterStateItem,
} from "types/tableFilters";

export interface EmptyMessage {
  icon: FC<SvgIconConstituentValues>;
  title: string;
  description?: string;
}

export interface TableTabs {
  items: TabsProps["items"];
  setTab: (arg: string) => void;
}

export interface TableSearch {
  placeholder?: string;
  value: string;
  setValue: (arg: string) => void;
}

export interface TableFilters {
  include?: AdditionalFilter[];
  value?: string;
  selected: FilterStateItem[] | [];
  filters: FilterOption[];
  setValue: (arg: FilterStateItem[]) => void;
}

export interface TableHeaderProps {
  isLoading?: boolean;
  leftTitle?: string;
  totalCount?: number;
  tabs?: TableTabs;
  search?: TableSearch;
  filter?: TableFilters;
  suffix?: ReactNode;
}
