import { CENTS_IN_COIN_RATE, Permission, initialPermissions } from "consts";
import { getFullName, removeHashContent } from "helpers/dataHelpers";

import { Coupon, DiscountType } from "types/coupons";
import { GetUsersResponseDto, User } from "types/users";
import { PurposeOptionResponseDto } from "types/authSettings";
import { SetSettingsRequestDto, SettingsResponseDto } from "types/settings";
import { GetReferralsResponseDto, ReferralsSettingsDto } from "types/referrals";
import {
  PaymentsSettingsResponseDto,
  SetPaymentsSettingsRequestDto,
} from "types/paymentsSettings";

import {
  CreateOrderRequestDto,
  GetOrdersResponseDto,
  OrderResponseDto,
} from "types/orders";
import {
  GetCustomerMenuResponseDto,
  GetCustomersMappedResponseDto,
  GetCustomersResponseDto,
} from "types/customers";

export const permissionsMapper = (
  user: User,
): Record<keyof typeof initialPermissions, boolean> => {
  const userPermissions = user.role.permissions;
  const userRole = user.role.name;

  if (!userPermissions?.length) {
    return initialPermissions;
  }

  const userCan: typeof initialPermissions = userPermissions
    .map(({ name }) => name)
    .reduce(
      (
        acc: Record<keyof typeof initialPermissions, boolean>,
        el: string,
      ): Record<keyof typeof initialPermissions, boolean> => {
        switch (el) {
          /* Orders */
          case Permission.OrdersGet:
            acc.canOrdersGet = true;
            break;
          case Permission.OrdersCreate:
            acc.canOrdersCreate = true;
            break;

          /* Roles section */
          case Permission.PermissionsGet:
            acc.canPermissionsGet = true;
            break;
          case Permission.RolesGet:
            acc.canRolesGet = true;
            break;
          case Permission.RolesCreate:
            acc.canRolesCreate = true;
            break;
          case Permission.RolesUpdate:
            acc.canRolesUpdate = true;
            break;
          case Permission.RolesDelete:
            acc.canRolesDelete = true;
            break;

          /* Settings section */
          case Permission.WaitingListUpdate:
            acc.canUpdateWaitingListSettings = true;
            break;
          case Permission.ExchangeRateUpdate:
            acc.canExchangeRateUpdate = true;
            break;
          case Permission.BalanceExpirationUpdate:
            acc.canBalanceExpirationUpdate = true;
            break;
          case Permission.SettingsGet:
            acc.canSettingsGet = true;
            break;
          case Permission.SettingsUpdate:
            acc.canSettingsUpdate = true;
            break;
          case Permission.SettingsPurposeGet:
            acc.сanPurposeGet = true;
            break;
          case Permission.SettingsPurposeCreate:
            acc.canPurposeCreate = true;
            break;
          case Permission.SettingsPurposeUpdate:
            acc.canPurposeUpdate = true;
            break;
          case Permission.SettingsPurposeDelete:
            acc.canPurposeDelete = true;
            break;
          case Permission.SettingsTimeSlotsGet:
            acc.canTimeSlotsGet = true;
            break;
          case Permission.SettingsTimeSlotsCreate:
            acc.canTimeSlotsCreate = true;
            break;
          case Permission.SettingsTimeSlotsUpdate:
            acc.canTimeSlotsUpdate = true;
            break;
          case Permission.SettingsTimeSlotsDelete:
            acc.canTimeSlotsDelete = true;
            break;
          case Permission.SettingsPaymentsGet:
            acc.canPaymentSettingsGet = true;
            break;
          case Permission.SettingsPaymentsUpdate:
            acc.canPaymentSettingsUpdate = true;
            break;
          case Permission.SettingsReferralsGet:
            acc.canReferralsSettingsGet = true;
            break;
          case Permission.SettingsReferralsUpdate:
            acc.canReferralsSettingsUpdate = true;
            break;
          case Permission.SettingsScheduleOrderGet:
            acc.canScheduleOrderSettingsGet = true;
            break;
          case Permission.SettingsScheduleOrderUpdate:
            acc.canScheduleOrderSettingsUpdate = true;
            break;
          case Permission.SettingsCouponsGet:
            acc.canCouponsSettingsGet = true;
            break;
          case Permission.SettingsCouponsUpdate:
            acc.canCouponsSettingsUpdate = true;
            break;
          case Permission.SettingsMenuGridGet:
            acc.canMenuGridSettingsGet = true;
            break;
          case Permission.SettingsMenuGridUpdate:
            acc.canMenuGridSettingsUpdate = true;
            break;
        }

        return acc;
      },
      { ...initialPermissions },
    );

  return userCan;
};

const devideByCentsInCoinRate = (value: number) => {
  if (!value) {
    return 0;
  }
  return (value * 1000) / CENTS_IN_COIN_RATE / 1000;
};

export const ordersMapper = (response: GetOrdersResponseDto) => {
  const { items, ...restResponse } = response;

  return {
    ...restResponse,
    items: items.map(item => ({
      ...item,
      totalFmcCentsPrice: devideByCentsInCoinRate(item.totalFmcCentsPrice),
      totalFiatCentsPrice: devideByCentsInCoinRate(item.totalFiatCentsPrice),
      fullName: getFullName({
        firstName: item?.firstName,
        lastName: item.lastName,
      }),
    })),
  };
};

export const customersMapper = (
  response: GetCustomersResponseDto,
): GetCustomersMappedResponseDto => {
  const { items, ...restResponse } = response;

  return {
    ...restResponse,
    items: items.map(profile => {
      const { firstName, lastName, balanceData } = profile;

      const fullName = getFullName({ firstName, lastName });

      return {
        ...profile,
        fullName,
        balanceData: {
          ...balanceData,
          fmcCentsAmount: devideByCentsInCoinRate(balanceData?.fmcCentsAmount),
        },
      };
    }),
  };
};

export const customerMenuMapper = (
  response: GetCustomerMenuResponseDto,
): GetCustomerMenuResponseDto => {
  const { categories, ...restResponse } = response;

  return {
    ...restResponse,
    categories: categories.map(category => {
      const { products } = category;

      return {
        ...category,

        products: products.map(product => ({
          ...product,
          fiatCentsPrice: devideByCentsInCoinRate(product.fiatCentsPrice),
          fmcCentsPrice: devideByCentsInCoinRate(product.fmcCentsPrice),
          addons: product.addons.map(addon => ({
            ...addon,
            type: "addon",
            name: removeHashContent(addon.name),
            fiatCentsPrice: devideByCentsInCoinRate(addon.fiatCentsPrice),
            fmcCentsPrice: devideByCentsInCoinRate(addon.fmcCentsPrice),
          })),
          modifiers: product.modifiers.map(modifier => ({
            ...modifier,
            name: removeHashContent(modifier.name),
            fiatCentsPrice: devideByCentsInCoinRate(modifier.fiatCentsPrice),
            fmcCentsPrice: devideByCentsInCoinRate(modifier.fmcCentsPrice),
          })),
        })),
      };
    }),
  };
};

export const orderMapper = (order: OrderResponseDto): OrderResponseDto => {
  const {
    totalFiatCentsPrice,
    totalFmcCentsPrice,
    items,
    firstName,
    lastName,
    ...restOrder
  } = order;

  return {
    ...restOrder,
    firstName,
    lastName,
    fullName: getFullName({ firstName, lastName }),
    totalFiatCentsPrice: devideByCentsInCoinRate(totalFiatCentsPrice),
    totalFmcCentsPrice: devideByCentsInCoinRate(totalFmcCentsPrice),
    items: items.map(item => ({
      ...item,
      fmcCentsPrice: devideByCentsInCoinRate(item.fmcCentsPrice),
      fiatCentsPrice: devideByCentsInCoinRate(item.fiatCentsPrice),
    })),
  };
};

export const minValuesMapper = (data: SettingsResponseDto) => {
  const { minimumOrderValue, minimumTopUpValue, ...restData } = data;

  return {
    ...restData,
    minimumOrderValue: devideByCentsInCoinRate(minimumOrderValue),
    minimumTopUpValue: devideByCentsInCoinRate(minimumTopUpValue),
  };
};

export const minValuesPayloadMapper = (data: SetSettingsRequestDto) => {
  const { minimumOrderValue, minimumTopUpValue, ...restData } = data;

  return {
    ...restData,
    minimumOrderValue: minimumOrderValue * CENTS_IN_COIN_RATE,
    minimumTopUpValue: minimumTopUpValue * CENTS_IN_COIN_RATE,
  };
};

export const usersMapper = (
  response: GetUsersResponseDto,
): GetUsersResponseDto => {
  const { items, ...restResponse } = response;

  return {
    ...restResponse,
    items: items.map(profile => {
      const { firstName, lastName } = profile;

      const fullName = getFullName({ firstName, lastName });

      return {
        ...profile,
        fullName,
      };
    }),
  };
};

export const purposeOptionsMapper = (data: PurposeOptionResponseDto[]) =>
  data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

export const cashPaymentsMapper = (
  responseData: PaymentsSettingsResponseDto,
): PaymentsSettingsResponseDto => {
  return {
    ...responseData,
    deliveryFeeFiatCents: devideByCentsInCoinRate(
      responseData.deliveryFeeFiatCents,
    ),
    deliveryFeeFmcCents: devideByCentsInCoinRate(
      responseData.deliveryFeeFmcCents,
    ),
  };
};

export const cashPaymentsPayloadMapper = (
  payload: SetPaymentsSettingsRequestDto,
): SetPaymentsSettingsRequestDto => {
  const { deliveryFeeFiatCents, deliveryFeeFmcCents, ...restPayload } = payload;

  return {
    deliveryFeeFiatCents: deliveryFeeFiatCents * CENTS_IN_COIN_RATE,
    deliveryFeeFmcCents: deliveryFeeFmcCents * CENTS_IN_COIN_RATE,
    ...restPayload,
  };
};

export const referralListMapper = (responseData: GetReferralsResponseDto) => {
  const { items, ...restData } = responseData;

  return {
    ...restData,
    items: items.map(item => ({
      ...item,
      bonusForInvitee: devideByCentsInCoinRate(item.bonusForInvitee),
      bonusForInviter: devideByCentsInCoinRate(item.bonusForInviter),
    })),
  };
};

export const referralSettingsMapper = (
  responseData: ReferralsSettingsDto,
): ReferralsSettingsDto => {
  return {
    ...responseData,
    bonusForInvitee: devideByCentsInCoinRate(responseData.bonusForInvitee),
    bonusForInviter: devideByCentsInCoinRate(responseData.bonusForInviter),
  };
};

export const referralSettingsPayloadMapper = (
  payload: ReferralsSettingsDto,
): ReferralsSettingsDto => {
  return {
    ...payload,
    bonusForInvitee: payload.bonusForInvitee * CENTS_IN_COIN_RATE,
    bonusForInviter: payload.bonusForInviter * CENTS_IN_COIN_RATE,
  };
};

export const couponMapper = (responseData: Coupon): Coupon => {
  return {
    ...responseData,
    discountOff:
      responseData?.discountType === DiscountType.Percentage
        ? responseData?.discountOff
        : devideByCentsInCoinRate(responseData?.discountOff),
    minimumOrderFiatCentsPrice: devideByCentsInCoinRate(
      responseData?.minimumOrderFiatCentsPrice,
    ),
    minimumOrderFmcCentsPrice: devideByCentsInCoinRate(
      responseData?.minimumOrderFmcCentsPrice,
    ),
    allowedUsers:
      responseData?.allowedUsers?.map(user => ({
        ...user,
        fullName: getFullName({
          firstName: user?.firstName,
          lastName: user?.lastName,
        }),
      })) || [],
  };
};

export const createOrderPayloadMapper = (
  payload: CreateOrderRequestDto,
): CreateOrderRequestDto => {
  return {
    ...payload,
    totalFmcCentsPrice: payload.totalFmcCentsPrice * CENTS_IN_COIN_RATE,
    totalFiatCentsPrice: payload.totalFiatCentsPrice * CENTS_IN_COIN_RATE,
    deliveryFeeFmcCentsPrice:
      payload.deliveryFeeFmcCentsPrice * CENTS_IN_COIN_RATE,
    deliveryFeeFiatCentsPrice:
      payload.deliveryFeeFiatCentsPrice * CENTS_IN_COIN_RATE,
    items: payload.items.map(item => ({
      ...item,
      fmcCentsPrice: item.fmcCentsPrice * CENTS_IN_COIN_RATE,
      subItems: item.subItems.map(s => ({
        ...s,
        fmcCentsPrice: s.fmcCentsPrice * CENTS_IN_COIN_RATE,
      })),
    })),
  };
};
