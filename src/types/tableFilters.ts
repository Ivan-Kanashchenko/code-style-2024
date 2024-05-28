export enum AdditionalFilter {
  Customer = "customer",
  UserInitiated = "userInitiated",
}

export interface FilterCustomDate {
  date?: { start: string; end: string };
  time?: { start: string; end: string };
}

export interface FilterStateItem {
  name: string;
  value: string | string[];
  subValue?: null | FilterCustomDate;
  field: FilterField;
}

export enum FilterField {
  SELECT = "select",
  MULTISELECT = "multiselect",
  INPUT = "input",
  INPUT_SELECT = "input_select",
  BOOLEAN = "boolean",
  DATE_RANGE = "date_range",
  DATE = "date",
  MULTISELECT_SINGLE_DATE = "multiselect_single_date",
  CUSTOMER_SELECT = "customer_select",
  USER_SELECT = "user_select",
}

export interface FilterFieldDropdownOption {
  type: string;
  label: string;
}

export type FieldDateRangeType = {
  field: FilterField.DATE_RANGE;
  options: FilterFieldDropdownOption[];
};

export type FieldCustomSingleDateType = {
  field: FilterField.MULTISELECT_SINGLE_DATE;
  options: FilterFieldDropdownOption[];
};

export type FieldDateType = {
  field: FilterField.DATE;
};

export type FieldInputType = {
  field: FilterField.INPUT;
};

export type FieldInputSelectType = {
  field: FilterField.INPUT_SELECT;
};

export type FieldSelectType = {
  field: FilterField.SELECT;
  options: FilterFieldDropdownOption[];
};

export type FieldMultiselectType = {
  field: FilterField.MULTISELECT;
  options: FilterFieldDropdownOption[];
};

export type FieldBooleanType = {
  field: FilterField.BOOLEAN;
};

export type FieldCustomerSelectType = {
  field: FilterField.CUSTOMER_SELECT;
};

export type FieldUserSelectType = {
  field: FilterField.USER_SELECT;
};

export type FilterOptionType = {
  // key: OrderFilterTypes;
  key: string;
  icon?: JSX.Element;
  label: string;
};

export type FilterOption = FilterOptionType &
  (
    | FieldInputType
    | FieldSelectType
    | FieldMultiselectType
    | FieldBooleanType
    | FieldDateRangeType
    | FieldCustomSingleDateType
    | FieldDateType
    | FieldInputSelectType
    | FieldCustomerSelectType
    | FieldUserSelectType
  );

export type TableFilterState = FilterStateItem[] | [];

export enum ETable {
  CustomerTransactions = "customerTransactions",
  CustomerOrders = "customerOrders",
  Customers = "customers",
  Orders = "orders",
  Users = "users",
  WaitingUsers = "waitingUsers",
  Transactions = "transactions",
  Recommended = "recommended",
  Referrals = "referrals",
  Coupons = "coupons",
  CouponCustomersAdd = "couponCustomersAdd",
}

export interface TableFiltersState {
  [ETable.Orders]: TableFilterState;
  [ETable.Customers]: TableFilterState;
  [ETable.CustomerOrders]: TableFilterState;
  [ETable.CustomerTransactions]: TableFilterState;
  [ETable.Users]: TableFilterState;
  [ETable.WaitingUsers]: TableFilterState;
  [ETable.Transactions]: TableFilterState;
}
