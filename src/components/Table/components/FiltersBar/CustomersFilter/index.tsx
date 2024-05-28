// Lib
import { FC, useEffect, useRef, useState } from "react";
import { Spin } from "antd";
// Api
import {
  useGetCustomersQuery,
  useLazyGetCustomerQuery,
} from "redux/query/customersAPI";
// Hooks
import { useDebounce, useNotification } from "hooks";
// Types
import { FilterField, FilterStateItem } from "types/tableFilters";
// Theme
import { theme } from "theme";
// Constants
import { rtkQueryParams } from "consts";
// Helpers
import { getFullName } from "helpers/dataHelpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import { ArrowDropDownBlackIcon, SearchBlackIcon } from "icons";
// Components
import { Avatar } from "components";
import { Input } from "components/Form";
// Styled
import { FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { CloseIcon, FilterSelect } from "../styled";

const ITEMS_PER_PAGE = 15;

interface CustomersFilterProps {
  name: string;
  isOpen: boolean;
  field: FilterField;
  selected: FilterStateItem[] | [];
  value: string;
  setIsOpen: (arg: boolean) => void;
  setFilterValue: (value: string, name: string) => void;
}

export const CustomersFilter: FC<CustomersFilterProps> = ({
  name,
  isOpen,
  field,
  selected,
  value,
  setIsOpen,
  setFilterValue,
}) => {
  const { openNotification } = useNotification();

  const isCustomersFilter = !!selected.find(
    el => (el as FilterStateItem).field === FilterField.CUSTOMER_SELECT,
  );

  const tempOptions = useRef<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [customerOptions, setCustomerOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [needFetch, setNeedFetch] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const firstName = useDebounce(search);
  const [getCustomerData] = useLazyGetCustomerQuery();

  const getCustomer = async id => {
    try {
      const data = await getCustomerData({ id }).unwrap();

      if (data) {
        const { firstName, lastName } = data || {};

        const option = {
          label: getFullName({ firstName, lastName }),
          value: id,
        };

        setNeedFetch(false);
        setCustomerOptions(prev => {
          if (prev.find(p => p.value === option.value)) {
            return prev;
          }
          return [option, ...prev];
        });
      }
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  useEffect(() => {
    const customersFilter = selected.find(
      el => (el as FilterStateItem)?.field === FilterField.CUSTOMER_SELECT,
    );
    if (customersFilter) {
      if (customersFilter?.value && needFetch) {
        const isInList = customerOptions.find(
          o => o.value === customersFilter?.value,
        );

        if (!isInList) {
          getCustomer(customersFilter?.value);
        }
      }
    }
  }, [customerOptions]);

  const {
    data: customersList,
    isFetching: isCustomersLoading,
    error,
  } = useGetCustomersQuery(
    {
      query: {
        page,
        limit: ITEMS_PER_PAGE,
        ...(firstName && { firstName }),
      },
    },
    { ...rtkQueryParams, skip: !isCustomersFilter },
  );

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  useEffect(() => {
    setPage(1);
    setCustomerOptions([]);
  }, [firstName]);

  useEffect(() => {
    if (customersList?.items) {
      const list = customersList?.items
        .map(({ firstName, lastName, id }) => ({
          label: getFullName({ firstName, lastName }),
          value: id,
        }))
        .filter(el => Boolean(el.label));

      setCustomerOptions(prev =>
        prev
          .concat(list)
          .filter(
            (value, index, self) =>
              index === self.findIndex(t => t.value === value.value),
          ),
      );

      tempOptions.current = tempOptions.current
        .concat(list)
        .filter(
          (value, index, self) =>
            index === self.findIndex(t => t.value === value.value),
        );
    }
  }, [customersList]);

  const onScroll = async event => {
    const target = event.target;
    if (!customersList?.items?.length) {
      return;
    }

    const totalPages = Math.ceil(
      customersList?.totalCount || 0 / ITEMS_PER_PAGE,
    );

    if (page < totalPages) {
      if (
        !isCustomersLoading &&
        target.scrollTop + target.offsetHeight === target.scrollHeight
      ) {
        setPage(prev => prev + 1);
      }
    }
  };

  const getCustomerValue = (
    value: string,
    options: { label: string; value: string }[],
    tempOptions: { label: string; value: string }[],
  ) => {
    if (!value) {
      return `Customer: `;
    }
    const option = options.find(el => el.value === value);

    if (option) {
      return `Customer: ${option?.label}`;
    }

    const fromTemp = tempOptions.find(el => el.value === value);

    if (fromTemp) {
      return `Customer: ${fromTemp?.label}`;
    }

    return `Customer: ${value}`;
  };

  return (
    <FilterSelect
      $inputType={field}
      onPopupScroll={onScroll}
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
      value={getCustomerValue(value, customerOptions, tempOptions.current)}
      options={customerOptions}
      optionRender={option => {
        return (
          <FlexContainer $align="center" $gap={8}>
            <FlexContainer $width="28px">
              <Avatar name={option?.data?.label} />
            </FlexContainer>

            <Typography.TitleThin
              style={{
                padding: "8px 0px",
                width: 220,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {option.data.label}
            </Typography.TitleThin>
          </FlexContainer>
        );
      }}
      dropdownRender={menu => (
        <FlexContainer $fullwidth $column $gap={8} $padding="12px">
          <Input
            prefix={<SearchBlackIcon />}
            placeholder="Search customer"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <Spin size="small" spinning={isCustomersLoading}>
            {menu}
          </Spin>
        </FlexContainer>
      )}
    />
  );
};
