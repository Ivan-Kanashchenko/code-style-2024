// Lib
import { FC, useEffect, useRef, useState } from "react";
import { Spin } from "antd";
// Api
import { useGetUsersQuery, useLazyGetUserQuery } from "redux/query/usersAPI";
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

export const UsersFilter: FC<CustomersFilterProps> = ({
  name,
  isOpen,
  field,
  selected,
  value,
  setIsOpen,
  setFilterValue,
}) => {
  const { openNotification } = useNotification();

  const isUsersFilter = !!selected.find(
    el => (el as FilterStateItem).field === FilterField.USER_SELECT,
  );

  const tempOptions = useRef<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [userOptions, setUserOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [needFetch, setNeedFetch] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounce(search);
  const [getUserData] = useLazyGetUserQuery();

  const getUser = async id => {
    try {
      const data = await getUserData({ id }).unwrap();

      if (data) {
        const { firstName, lastName } = data || {};

        const option = {
          label: getFullName({ firstName, lastName }),
          value: id,
        };

        setNeedFetch(false);
        setUserOptions(prev => {
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
    const usersFilter = selected.find(
      el => (el as FilterStateItem)?.field === FilterField.USER_SELECT,
    );
    if (usersFilter) {
      if (usersFilter?.value && needFetch) {
        const isInList = userOptions.find(o => o.value === usersFilter?.value);

        if (!isInList) {
          getUser(usersFilter?.value);
        }
      }
    }
  }, [userOptions]);

  const {
    data: usersList,
    isFetching: isUsersLoading,
    error,
  } = useGetUsersQuery(
    {
      query: {
        page,
        limit: ITEMS_PER_PAGE,
        ...(debouncedSearch && { search: debouncedSearch }),
      },
    },
    { ...rtkQueryParams, skip: !isUsersFilter },
  );

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  useEffect(() => {
    setPage(1);
    setUserOptions([]);
  }, [debouncedSearch]);

  useEffect(() => {
    if (usersList?.items) {
      const list = usersList?.items
        .map(({ firstName, lastName, id }) => ({
          label: getFullName({ firstName, lastName }),
          value: id,
        }))
        .filter(el => Boolean(el.label));

      setUserOptions(prev =>
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
  }, [usersList]);

  const onScroll = async event => {
    const target = event.target;
    if (!usersList?.items?.length) {
      return;
    }

    const totalPages = Math.ceil(usersList?.totalCount || 0 / ITEMS_PER_PAGE);

    if (page < totalPages) {
      if (
        !isUsersLoading &&
        target.scrollTop + target.offsetHeight === target.scrollHeight
      ) {
        setPage(prev => prev + 1);
      }
    }
  };

  const getUserValue = (
    value: string,
    options: { label: string; value: string }[],
    tempOptions: { label: string; value: string }[],
  ) => {
    if (!value) {
      return `User Initiated: `;
    }
    const option = options.find(el => el.value === value);

    if (option) {
      return `User Initiated: ${option?.label}`;
    }

    const fromTemp = tempOptions.find(el => el.value === value);

    if (fromTemp) {
      return `User Initiated: ${fromTemp?.label}`;
    }

    return `User Initiated: ${value}`;
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
      value={getUserValue(value, userOptions, tempOptions.current)}
      options={userOptions}
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
            placeholder="Search user"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <Spin size="small" spinning={isUsersLoading}>
            {menu}
          </Spin>
        </FlexContainer>
      )}
    />
  );
};
