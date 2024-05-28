// Lib
import { FC } from "react";
import { Select } from "antd";
// Icons
import { DownArrowIcon } from "icons";
// Styled
import { PaginationContainer, StyledPagination, Wrapper } from "./styled";

const defaultOptions = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 1000,
    label: "1000",
  },
];

interface PaginationProps {
  limit: number;
  page: number;
  setLimit: (arg: number) => void;
  setPage: (arg: number) => void;
  shadow?: boolean;
  padding?: string;
  onPage?: boolean;
  pageSizeOptions?: {
    value: number;
    label: string;
  }[];
  additinalSizeOptions?: {
    value: number;
    label: string;
  }[];
  totalItems?: number;
}

export const Pagination: FC<PaginationProps> = ({
  padding,
  shadow,
  onPage,
  limit,
  page,
  setLimit,
  setPage,
  pageSizeOptions,
  totalItems,
}) => {
  const handleChange = (value: number) => {
    setLimit(value);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const getCurrentOrder = () => {
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalItems);
    return `${startItem}-${endItem} of ${totalItems}`;
  };

  const currentItemsOrder = totalItems && getCurrentOrder();

  return (
    <Wrapper
      $align="center"
      $justify="space-between"
      $shadow={shadow}
      $onPage={onPage}
      $padding={padding}
    >
      <div>
        <Select
          suffixIcon={<DownArrowIcon />}
          defaultValue={10}
          value={limit}
          style={{ width: 85, marginRight: 10 }}
          onChange={handleChange}
          options={
            pageSizeOptions ||
            defaultOptions.concat({ label: "All", value: totalItems })
          }
        />
        Rows per page
      </div>

      <PaginationContainer>
        <StyledPagination
          current={page}
          pageSize={limit}
          onChange={onPageChange}
          showSizeChanger={false}
          total={totalItems}
        />
      </PaginationContainer>

      {totalItems ? <div>{currentItemsOrder}</div> : <div />}
    </Wrapper>
  );
};
