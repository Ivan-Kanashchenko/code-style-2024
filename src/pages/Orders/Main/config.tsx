import { Link } from "react-router-dom";
import { TABLE_DATE } from "consts";
import { dateTransform, fixedDigitsValue } from "helpers/dataHelpers";
import { EFilterDateLabel, EFilterDateValue } from "types/common";
import {
  ChargeStatus,
  ChargeStatusLabel,
  OrderFilterNames,
  OrderFilterTypes,
  OrderStatus,
  OrderStatusLabel,
} from "types/orders";
import {
  FilterField,
  FilterFieldDropdownOption,
  FilterOption,
} from "types/tableFilters";

import { Avatar, Badge } from "components";
import { CallBlackIcon, CurrencyIcon } from "icons";
import { FlexContainer } from "styled/Box";

export const columns = [
  {
    title: "Customer",
    dataIndex: "fullName",
    key: "fullName",
    sorter: true,
    render: (name: string | null) =>
      name ? (
        <FlexContainer $align="center" $gap={8}>
          <Avatar name={name} /> {name}
        </FlexContainer>
      ) : null,
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Order value",
    dataIndex: "totalFiatCentsPrice",
    key: "totalFiatCentsPrice",
    sorter: true,
    render: (value: string) => `${fixedDigitsValue(Number(value), 3)} KWD`,
  },
  {
    title: "FM Coin",
    dataIndex: "totalFmcCentsPrice",
    key: "totalFmcCentsPrice",
    render: (value: string) => (
      <FlexContainer $align="center" $justify="flex-end" $gap={8}>
        {fixedDigitsValue(Number(value), 3)} <CurrencyIcon />
      </FlexContainer>
    ),
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (status: OrderStatus) =>
      status && <Badge title={OrderStatusLabel[status]} />,
  },
  {
    title: "Charge Status",
    dataIndex: "chargeStatus",
    key: "chargeStatus",
    render: (status: ChargeStatus) =>
      status && <Badge title={ChargeStatusLabel[status]} />,
  },
  {
    title: "Location",
    dataIndex: "locationName",
    key: "locationName",
    sorter: true,
    render: (text: string, record) => (
      <FlexContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Link to={`/delivery-areas/${record?.locationId}`}> {text}</Link>
      </FlexContainer>
    ),
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (date: string) =>
      dateTransform({
        date,
        format: TABLE_DATE,
      }),
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: true,
    render: (date: string) =>
      dateTransform({
        date,
        format: TABLE_DATE,
      }),
  },
];

export const dateTimeDropdownFields: FilterFieldDropdownOption[] = [
  {
    type: EFilterDateValue.TODAY,
    label: EFilterDateLabel[EFilterDateValue.TODAY],
  },
  {
    type: EFilterDateValue.YESTERDAY,
    label: EFilterDateLabel[EFilterDateValue.YESTERDAY],
  },
  {
    type: EFilterDateValue.IN_THE_LAST_7_DAYS,
    label: EFilterDateLabel[EFilterDateValue.IN_THE_LAST_7_DAYS],
  },
  {
    type: EFilterDateValue.IN_THE_LAST_30_DAYS,
    label: EFilterDateLabel[EFilterDateValue.IN_THE_LAST_30_DAYS],
  },
  {
    type: EFilterDateValue.IN_THE_LAST_90_DAYS,
    label: EFilterDateLabel[EFilterDateValue.IN_THE_LAST_90_DAYS],
  },
  {
    type: EFilterDateValue.IN_THE_12_MONTHS,
    label: EFilterDateLabel[EFilterDateValue.IN_THE_12_MONTHS],
  },
  {
    type: EFilterDateValue.CUSTOM,
    label: EFilterDateLabel[EFilterDateValue.CUSTOM],
  },
];

export const orderStatusDropdownFields: FilterFieldDropdownOption[] = [
  {
    type: OrderStatus.PENDING,
    label: OrderStatusLabel[OrderStatus.PENDING],
  },
  {
    type: OrderStatus.ACCEPTED,
    label: OrderStatusLabel[OrderStatus.ACCEPTED],
  },
  {
    type: OrderStatus.PREPARING,
    label: OrderStatusLabel[OrderStatus.PREPARING],
  },
  {
    type: OrderStatus.PREPARED,
    label: OrderStatusLabel[OrderStatus.PREPARED],
  },
  {
    type: OrderStatus.READY_FOR_PICKUP,
    label: OrderStatusLabel[OrderStatus.READY_FOR_PICKUP],
  },
  {
    type: OrderStatus.AUTO_FINALIZED,
    label: OrderStatusLabel[OrderStatus.AUTO_FINALIZED],
  },
  {
    type: OrderStatus.CANCELED,
    label: OrderStatusLabel[OrderStatus.CANCELED],
  },
  {
    type: OrderStatus.IN_DELIVERY,
    label: OrderStatusLabel[OrderStatus.IN_DELIVERY],
  },
  {
    type: OrderStatus.DELIVERED,
    label: OrderStatusLabel[OrderStatus.DELIVERED],
  },
];
export const chargeStatusDropdownFields: FilterFieldDropdownOption[] = [
  {
    type: ChargeStatus.PENDING,
    label: ChargeStatusLabel[ChargeStatus.PENDING],
  },
  {
    type: ChargeStatus.SUCCEEDED,
    label: ChargeStatusLabel[ChargeStatus.SUCCEEDED],
  },
  {
    type: ChargeStatus.FAILED,
    label: ChargeStatusLabel[ChargeStatus.FAILED],
  },
  {
    type: ChargeStatus.REFUND_REQUESTED,
    label: ChargeStatusLabel[ChargeStatus.REFUND_REQUESTED],
  },
  {
    type: ChargeStatus.REFUND_SUCCEEDED,
    label: ChargeStatusLabel[ChargeStatus.REFUND_SUCCEEDED],
  },
  {
    type: ChargeStatus.REFUND_FAILED,
    label: ChargeStatusLabel[ChargeStatus.REFUND_FAILED],
  },
  {
    type: ChargeStatus.UNPAID,
    label: ChargeStatusLabel[ChargeStatus.UNPAID],
  },
];

export const filtersList: FilterOption[] = [
  {
    key: OrderFilterTypes.sidLike,
    label: OrderFilterNames[OrderFilterTypes.sidLike],
    field: FilterField.INPUT_SELECT,
  },
  {
    key: OrderFilterTypes.phoneNumber,
    icon: <CallBlackIcon />,
    label: OrderFilterNames[OrderFilterTypes.phoneNumber],
    field: FilterField.INPUT_SELECT,
  },
  {
    key: OrderFilterTypes.createdAfter,
    label: OrderFilterNames[OrderFilterTypes.createdAfter],
    field: FilterField.DATE,
  },
  {
    key: OrderFilterTypes.updatedAfter,
    label: OrderFilterNames[OrderFilterTypes.updatedAfter],
    field: FilterField.DATE,
  },
  {
    key: OrderFilterTypes.orderStatus,
    label: OrderFilterNames[OrderFilterTypes.orderStatus],
    field: FilterField.SELECT,
    options: orderStatusDropdownFields,
  },
  {
    key: OrderFilterTypes.chargeStatus,
    label: OrderFilterNames[OrderFilterTypes.chargeStatus],
    field: FilterField.SELECT,
    options: chargeStatusDropdownFields,
  },
];
