import {
  CustomerMenuAddonModifier,
  CustomerMenuProduct,
} from "types/customers";

export type AddonsModifiers = {
  addon: CustomerMenuAddonModifier[];
  modifier: CustomerMenuAddonModifier[];
};

export type SubtotalProductData = {
  subTotalCoins: string | number;
  subTotalFiat: string | number;
};

export type CompleteProductData = {
  uniqId?: string;
  product: CustomerMenuProduct;
  addonsModifiers: AddonsModifiers;
  quantity: number;
};

export type SummaryData = {
  quantity: number;
  subTotal: {
    coins: number;
    fiat: number;
  };
  deliveryFee: {
    coins: string | number;
    fiat: string | number;
  };
  total: {
    coins: number;
    fiat: number;
  };
  couponsDiscount?: Record<string, { coins: number; fiat: number }>;
};
