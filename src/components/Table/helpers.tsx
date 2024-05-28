import {
  CalendarTodayIcon,
  ExpandCircleIcon,
  TagIcon,
  DiningIcon,
  PersonIcon,
} from "icons";
import {
  AdditionalFilter,
  FilterField,
  FilterOption,
} from "types/tableFilters";
import { ButtonLink } from "components";
import { FlexContainer } from "styled/Box";
import { FiltersDropdownLabel, MockedImage, TableImage } from "./styled";

export const createTableColumns = ({ columns, actions }) => {
  if (!columns?.length) return [];

  const columnData = columns.map((column, i) => {
    if (column.key === "image" || column.key === "imageUrl") {
      return {
        ...column,
        render: (src: string) =>
          src?.length ? (
            <TableImage key={i} src={src} />
          ) : (
            <MockedImage key={i}>
              <DiningIcon />
            </MockedImage>
          ),
      };
    }
    return column;
  });

  if (!actions) {
    return columnData;
  }
  const getActionsWidth = () => {
    const withTitle = actions.find(el => Boolean(el?.title));

    if (!withTitle) {
      return actions?.length * 30;
    }

    return undefined;
  };

  const tableActions = actions?.filter(f => !f?.disabled)?.length && [
    {
      title: "",
      key: "action",
      width: getActionsWidth(),
      align: "right" as const,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) => (
        <FlexContainer $gap={16}>
          {actions
            ?.filter(f => !f?.disabled && !record[f?.disabledIfFieldIsTrue])
            ?.map(({ title, Icon, onClick, type, loadingId }, i) => (
              <ButtonLink
                key={title + i}
                loading={record?.id === loadingId}
                icon={Icon ? <Icon /> : null}
                title={title}
                danger={title === "Delete" || type === "Delete"}
                grey={type === "Grey"}
                onClick={() => onClick(record)}
              />
            ))}
        </FlexContainer>
      ),
    },
  ];

  if (!tableActions?.length) return columnData;

  return columnData.concat(tableActions);
};

const getDropDownOptionIcon = (field: FilterField) => {
  switch (field) {
    case FilterField.DATE:
    case FilterField.DATE_RANGE:
    case FilterField.MULTISELECT_SINGLE_DATE:
      return <CalendarTodayIcon />;
    case FilterField.INPUT:
    case FilterField.INPUT_SELECT:
      return <TagIcon />;
    case FilterField.SELECT:
    case FilterField.MULTISELECT:
    case FilterField.BOOLEAN:
      return <ExpandCircleIcon />;
    case FilterField.CUSTOMER_SELECT:
    case FilterField.USER_SELECT:
      return <PersonIcon />;

    default:
      return <ExpandCircleIcon />;
  }
};

export const createFiltersDropdown = (filters: FilterOption[]) => {
  return filters.map(filter => ({
    ...filter,
    label: <FiltersDropdownLabel>{filter.label}</FiltersDropdownLabel>,
    icon: filter?.icon || getDropDownOptionIcon(filter.field),
  }));
};

export const updateFiltersData = (
  filters: FilterOption[],
  include?: AdditionalFilter[],
) => {
  let filtersList = filters;
  if (include?.includes(AdditionalFilter.Customer)) {
    filtersList = filtersList.concat({
      key: "customerId",
      label: "Customer",
      field: FilterField.CUSTOMER_SELECT,
    });
  }
  if (include?.includes(AdditionalFilter.UserInitiated)) {
    filtersList = filtersList.concat({
      key: "initiatorId",
      label: "User Initiated",
      field: FilterField.USER_SELECT,
    });
  }

  return filtersList;
};
