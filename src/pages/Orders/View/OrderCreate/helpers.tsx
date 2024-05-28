// Lib
import { ReactNode } from "react";
// Types
import {
  CustomerMenuAddonModifier,
  GetCustomersAddressResponseDto,
} from "types/customers";
import { UserDeliveryAddressForm } from "types/orders";
import { Coupon, DiscountType } from "types/coupons";
import { CompleteProductData, SubtotalProductData, SummaryData } from "./types";
// Helpers
import { fixedDigitsValue, splitPhoneNumber } from "helpers/dataHelpers";
// Icons
import { CurrencyIcon } from "icons";
// Styled
import { Typography } from "styled/Typography";
import { FlexContainer } from "styled/Box";
import { CouponTypeContainer } from "./components/VoucherCode/styled";

export const handleMutateOrderItems = (
  prev: CompleteProductData[],
  data: CompleteProductData,
): CompleteProductData[] => {
  const index = prev.findIndex(el => el.uniqId === data.uniqId);

  if (index === undefined) {
    return prev;
  }

  const newArray = [...prev];

  newArray[index] = data;

  return newArray;
};

const getPercentageDiscountValue = (value: number, percents: number) => {
  if (value <= 0) {
    return 0;
  }
  return (value * percents) / 100;
};

const getAddonsTotalPrice = (addons: CustomerMenuAddonModifier[]) => {
  return addons.reduce(
    (acc, el) => {
      const coins = el?.fmcCentsPrice ? el.fmcCentsPrice * 1000 : 0;

      const fiat = el?.fiatCentsPrice ? el.fiatCentsPrice * 1000 : 0;

      return {
        coins: acc.coins + coins,
        fiat: acc.fiat + fiat,
      };
    },
    { coins: 0, fiat: 0 },
  );
};

export const getSubtotal = ({
  product,
  addonsModifiers,
  quantity,
}: CompleteProductData): SubtotalProductData => {
  const productPrice = {
    coins: product?.fmcCentsPrice ? product.fmcCentsPrice * 1000 : 0,
    fiat: product?.fiatCentsPrice ? product.fiatCentsPrice * 1000 : 0,
  };

  const addonsPrice = getAddonsTotalPrice(addonsModifiers.addon);

  const subTotalCoins = fixedDigitsValue(
    ((productPrice.coins + addonsPrice.coins) / 1000) * quantity,
    1,
  );

  const subTotalFiat = fixedDigitsValue(
    ((productPrice.fiat + addonsPrice.fiat) / 1000) * quantity,
    3,
  );

  return { subTotalCoins, subTotalFiat };
};

export const renderSubtotal = (data: CompleteProductData): ReactNode => {
  const { subTotalCoins, subTotalFiat } = getSubtotal(data);
  return (
    <FlexContainer $gap={4} $align="center">
      <CurrencyIcon />

      <Typography.Title>
        {subTotalCoins} | KD {subTotalFiat}
      </Typography.Title>
    </FlexContainer>
  );
};

export const calculateSummary = (
  coupons: Coupon[],
  orderItems: CompleteProductData[],
  deliveryFee: {
    fiatCentsPrice: number;
    totalFmcCentsPrice: number;
  },
): SummaryData => {
  const orderItemsData = orderItems.reduce(
    (acc, el) => {
      const productPrice = {
        coins: el.product?.fmcCentsPrice ? el.product.fmcCentsPrice * 1000 : 0,
        fiat: el.product?.fiatCentsPrice ? el.product.fiatCentsPrice * 1000 : 0,
      };

      const addonsPrice = getAddonsTotalPrice(el.addonsModifiers.addon);

      const subTotalCoins =
        (productPrice.coins + addonsPrice.coins) * el.quantity;
      const subTotalFiat = (productPrice.fiat + addonsPrice.fiat) * el.quantity;

      return {
        subTotal: {
          coins: acc.subTotal.coins + subTotalCoins,
          fiat: acc.subTotal.fiat + subTotalFiat,
        },
        quantity: acc.quantity + el.quantity,
      };
    },
    {
      subTotal: { coins: 0, fiat: 0 },
      quantity: 0,
    },
  );

  const percentageCoupons = coupons.filter(
    c => c.discountType === DiscountType.Percentage,
  );

  const fixedValuesCoupons = coupons.filter(
    c => c.discountType !== DiscountType.Percentage,
  );

  const couponsDiscount = {};

  const discountedTotal = {
    coins: orderItemsData.subTotal.coins,
    fiat: orderItemsData.subTotal.fiat,
  };

  fixedValuesCoupons.forEach(c => {
    const coins =
      orderItemsData.subTotal.coins === 0
        ? 0
        : orderItemsData.subTotal.coins < c.minimumOrderFmcCentsPrice * 1000
        ? 0
        : c.discountType === DiscountType.FmcCents
        ? c.discountOff * 1000
        : 0;

    const fiat =
      orderItemsData.subTotal.coins === 0
        ? 0
        : orderItemsData.subTotal.fiat < c.minimumOrderFiatCentsPrice * 1000
        ? 0
        : c.discountType === DiscountType.FiatCents
        ? c.discountOff * 1000
        : 0;

    discountedTotal.coins -= coins;

    discountedTotal.fiat -= fiat;

    couponsDiscount[c.id] = {
      coins: coins / 1000,
      fiat: fiat / 1000,
    };
  });

  percentageCoupons.forEach(c => {
    const coins =
      orderItemsData.subTotal.coins === 0
        ? 0
        : orderItemsData.subTotal.coins < c.minimumOrderFmcCentsPrice * 1000
        ? 0
        : getPercentageDiscountValue(discountedTotal.coins, c.discountOff);

    const fiat =
      orderItemsData.subTotal.coins === 0
        ? 0
        : orderItemsData.subTotal.fiat < c.minimumOrderFiatCentsPrice * 1000
        ? 0
        : getPercentageDiscountValue(discountedTotal.fiat, c.discountOff);

    discountedTotal.coins -= coins;

    discountedTotal.fiat -= fiat;

    couponsDiscount[c.id] = {
      coins: coins / 1000,
      fiat: fiat / 1000,
    };
  });

  const discountedTotalCoins =
    discountedTotal.coins > 0 ? discountedTotal.coins : 0;

  const discountedTotalFiat =
    discountedTotal.fiat > 0 ? discountedTotal.fiat : 0;

  return {
    quantity: orderItemsData.quantity || 0,
    subTotal: {
      coins: discountedTotalCoins / 1000,
      fiat: discountedTotalFiat / 1000,
    },
    deliveryFee: {
      coins: deliveryFee.totalFmcCentsPrice,
      fiat: deliveryFee.fiatCentsPrice,
    },
    total: {
      coins:
        (discountedTotalCoins + deliveryFee.totalFmcCentsPrice * 1000) / 1000,
      fiat: (discountedTotalFiat + deliveryFee.fiatCentsPrice * 1000) / 1000,
    },
    couponsDiscount,
  };
};

export const renderDiscountInfo = (coupon: Coupon) => {
  const getType = () => {
    switch (coupon.discountType) {
      case DiscountType.Percentage:
        return {
          renderValue: <Typography.Title>%</Typography.Title>,
          value: "%",
        };
      case DiscountType.FiatCents:
        return {
          renderValue: <Typography.Title>KD</Typography.Title>,
          value: " KWD",
        };
      case DiscountType.FmcCents:
        return {
          renderValue: <CurrencyIcon width="24" height="24" />,
          value: " FM Coins",
        };

      default:
        break;
    }
  };

  const { minimumOrderFiatCentsPrice, minimumOrderFmcCentsPrice } = coupon;

  const { value, renderValue } = getType();

  const minOrderDescription = `${
    minimumOrderFmcCentsPrice
      ? `${fixedDigitsValue(minimumOrderFmcCentsPrice, 1)} FM Coins`
      : ""
  }${minimumOrderFmcCentsPrice && minimumOrderFiatCentsPrice ? " | " : ""}${
    minimumOrderFiatCentsPrice
      ? `KD ${fixedDigitsValue(minimumOrderFiatCentsPrice, 3)}`
      : ""
  }`;

  return (
    <FlexContainer $gap={12} $align="center">
      <CouponTypeContainer>{renderValue}</CouponTypeContainer>

      <div>
        <Typography.Description>Voucher applied</Typography.Description>

        <Typography.Title>{`${coupon.discountOff}${value} off`}</Typography.Title>

        {minOrderDescription && (
          <Typography.DescriptionThin>
            Min Purchase: {minOrderDescription}
          </Typography.DescriptionThin>
        )}
      </div>
    </FlexContainer>
  );
};

const transformDeliveryAddressesToFormValues = (
  address: GetCustomersAddressResponseDto,
): UserDeliveryAddressForm => {
  const { phone, phoneCode } = splitPhoneNumber(address.phone);
  return {
    id: address.id,
    name: address.name,
    city: address.city,
    area: address.area,
    block: address.block,
    street: address.street,
    building: address.building,
    floor: address.floor,
    flat: address.flat,
    additionalInfo: address.additionalInfo,
    isSelected: address?.isSelected,
    phoneCode,
    phone,
  };
};

export const getDeliveryAddresses = (
  deliveryAddresses: GetCustomersAddressResponseDto[],
): {
  defaultDeliveryAddress: UserDeliveryAddressForm | null;
  deliveryAddressesList: UserDeliveryAddressForm[];
} => {
  if (!deliveryAddresses || !deliveryAddresses?.length) {
    return {
      defaultDeliveryAddress: null,
      deliveryAddressesList: [],
    };
  }

  const deliveryAddressesList = deliveryAddresses?.map(a =>
    transformDeliveryAddressesToFormValues(a),
  );

  const defaultDeliveryAddress =
    deliveryAddressesList?.find(a => a.isSelected) || null;

  return {
    defaultDeliveryAddress,
    deliveryAddressesList,
  };
};
