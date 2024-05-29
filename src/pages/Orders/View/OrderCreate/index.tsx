// Lib
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// Api
import {
  useCreateOrderDeliveryManualMutation,
  useCreateOrderMutation,
} from "redux/query/ordersAPI";
import { useGetCashPaymentsSettingsQuery } from "redux/query/cashPaymentsSettingsAPI";
// Hooks
import { useNotification } from "hooks";
// Types
import {
  CustomerProfileResponseDto,
  GetCustomersAddressResponseDto,
} from "types/customers";
import {
  UserDeliveryAddressForm,
  OrderPaymentType,
  OrderType,
} from "types/orders";
import { Coupon } from "types/coupons";
import { CompleteProductData } from "./types";
// Constants
import { ADMIN_ROUTES, rtkQueryParams } from "consts";
// Helpers
import {
  generateUniqueId,
  isUserDeliveryAddressValid,
  splitPhoneNumber,
} from "helpers/dataHelpers";
import {
  calculateSummary,
  getDeliveryAddresses,
  handleMutateOrderItems,
} from "./helpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import { DiningIcon } from "icons";
// Components
import { ArrowBackLink } from "components";
import { ConfirmDialog } from "components/Modals";
import {
  CustomerInformations,
  DeliveryAddress,
  OrderDetails,
  OrderSummary,
  Store,
  VoucherCode,
} from "./components";
// Styled
import {
  FlexContainer,
  PageHeadingContainer,
  PageTitleContainer,
} from "styled/Box";
import { Typography } from "styled/Typography";
import { Button } from "styled/Buttons";
import { AreaWrapper, PageFormsWrapper } from "./styled";

export const OrderCreate: FC = () => {
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const { data: paymentSettingsData, error } = useGetCashPaymentsSettingsQuery(
    null,
    rtkQueryParams,
  );

  useEffect(() => {
    if (error) {
      errorHandler({ error, openNotification });
    }
  }, [error]);

  const [createDelivery] = useCreateOrderDeliveryManualMutation();

  const [createOrder] = useCreateOrderMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [isOrderCreateConfirm, setIsOrderCreateConfirm] = useState(false);

  const [locationId, setLocationId] = useState<string>("");
  const [menuId, setMenuId] = useState<string>("");
  const [customerData, setCustomerData] =
    useState<CustomerProfileResponseDto | null>(null);

  const [isUseUserPhone, setIsUserPhone] = useState(false);

  const [deliveryAddresses, setDeliveryAddresses] = useState<
    GetCustomersAddressResponseDto[] | null
  >(null);

  const [userDeliveryAddress, setUserDeliveryAddress] =
    useState<UserDeliveryAddressForm | null>(null);

  const [orderItems, setOrderItems] = useState<CompleteProductData[]>([]);

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [isCutlery, setIsCutlery] = useState(false);

  const [paymentType, setPaymentType] = useState<OrderPaymentType>(
    OrderPaymentType.FmcCents,
  );

  useEffect(() => {
    setUserDeliveryAddress(null);
    setLocationId(null);
    setOrderItems([]);
    setCoupons([]);
    setIsCutlery(false);
    setPaymentType(OrderPaymentType.FmcCents);
  }, [customerData]);

  const onLocationChange = useCallback((id: string) => {
    setLocationId(id);
  }, []);

  const onSetIsUserPhone = useCallback(
    (value: boolean) => {
      if (value) {
        const data = splitPhoneNumber(customerData.phoneNumber);
        setUserDeliveryAddress(prev => ({
          ...prev,
          phone: data?.phone,
          phoneCode: data?.phoneCode,
        }));
      } else {
        setUserDeliveryAddress(prev => ({ ...prev, phone: "", phoneCode: "" }));
      }

      setIsUserPhone(value);
    },
    [customerData],
  );

  const handleAddOrderItem = useCallback((data: CompleteProductData) => {
    if (!data?.uniqId) {
      setOrderItems(prev =>
        prev.concat({ ...data, uniqId: generateUniqueId() }),
      );

      openNotification({ message: `${data.product.name} successfully added` });
      return;
    }

    setOrderItems(prev => handleMutateOrderItems(prev, data));

    openNotification({ message: `${data.product.name} successfully updated` });
  }, []);

  const handleRemoveOrderItem = useCallback((id: string) => {
    setOrderItems(prev => prev.filter(i => i.uniqId !== id));
  }, []);

  const handleAddCoupon = useCallback((coupon: Coupon) => {
    setCoupons(prev => {
      if (prev.find(c => c.id === coupon.id)) {
        return prev;
      }

      return prev.concat(coupon);
    });
  }, []);

  const handleRemoveCoupon = useCallback((id: string) => {
    setCoupons(prev => prev.filter(i => i.id !== id));
  }, []);

  const deliveryFee = useMemo(
    () => ({
      fiatCentsPrice: paymentSettingsData?.deliveryFeeFiatCents || 0,
      totalFmcCentsPrice: paymentSettingsData?.deliveryFeeFmcCents || 0,
    }),
    [paymentSettingsData],
  );

  const summary = useMemo(
    () => calculateSummary(coupons, orderItems, deliveryFee),
    [coupons, orderItems, deliveryFee],
  );

  const handlePlaceOrder = useCallback(() => {
    setIsOrderCreateConfirm(true);
  }, []);

  const handleCreateOrder = async () => {
    try {
      setIsLoading(true);
      const { street, area, block, building, city } = userDeliveryAddress;

      const { id } = await createDelivery({
        customerId: customerData.id,
        locationId,
        deliveryProvider: "deliverect",
        address: {
          street,
          area,
          block,
          building,
          city,
          phoneNumber: `+${userDeliveryAddress.phoneCode}${userDeliveryAddress.phone}`,
        },
      }).unwrap();

      const items = orderItems.map(i => ({
        productId: i.product.id,
        quantity: i.quantity,
        fmcCentsPrice: i.product.fmcCentsPrice,
        subItems: [
          ...i.addonsModifiers.addon,
          ...i.addonsModifiers.modifier,
        ].map(a => ({
          productId: a.id,
          quantity: 1,
          fmcCentsPrice: a.fmcCentsPrice,
        })),
      }));

      const order = await createOrder({
        customerId: customerData.id,
        menuId,
        items,
        totalFmcCentsPrice: summary.subTotal.coins,
        totalFiatCentsPrice: summary.subTotal.fiat,
        deliveryId: id,
        cutlery: isCutlery,
        deliveryFeeFmcCentsPrice: Number(summary.deliveryFee.coins) || 0,
        deliveryFeeFiatCentsPrice: Number(summary.deliveryFee.fiat) || 0,
        paymentType: paymentType,
        type: OrderType.INSTANT_ORDER,
        couponIds: coupons.map(c => c.id),
      }).unwrap();

      openNotification({ message: "Order successfully placed" });

      setIsOrderCreateConfirm(false);

      navigate(`${ADMIN_ROUTES.ORDERS.path}/${order.id}`);
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(false);
    }
  };

  const { defaultDeliveryAddress, deliveryAddressesList } = useMemo(
    () => getDeliveryAddresses(deliveryAddresses),
    [deliveryAddresses],
  );

  const isOrderAvailable = useMemo(
    () => locationId && isUserDeliveryAddressValid(userDeliveryAddress),
    [locationId, userDeliveryAddress],
  );

  const isBalanceError = useMemo(
    () =>
      paymentType === OrderPaymentType.FmcCents &&
      summary.total.coins > customerData?.balanceData?.fmcCentsAmount,
    [paymentType, summary, customerData],
  );
  const isOrderCreatingAvailable = !!orderItems?.length && !isBalanceError;

  return (
    <>
      <PageHeadingContainer $margin="0 0 24px 0">
        <PageTitleContainer $column>
          <ArrowBackLink
            title="Back to Orders"
            path={ADMIN_ROUTES.ORDERS.path}
          />

          <FlexContainer
            $gap={12}
            $align="center"
            $justify="center"
            $margin="20px 0 0 0"
          >
            <Typography.H1>Add New Order</Typography.H1>
          </FlexContainer>
        </PageTitleContainer>

        <FlexContainer $gap={8}>
          <Button.Heading onClick={() => setCustomerData(null)}>
            Discard
          </Button.Heading>

          <Button.Heading
            type="primary"
            disabled={!isOrderCreatingAvailable}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button.Heading>
        </FlexContainer>
      </PageHeadingContainer>

      <PageFormsWrapper>
        <FlexContainer $column $gap={16}>
          <CustomerInformations
            customerData={customerData}
            defaultDeliveryAddress={defaultDeliveryAddress}
            setCustomerData={setCustomerData}
            setDeliveryAddresses={setDeliveryAddresses}
          />

          <AreaWrapper $available="tablet">
            <Store
              isCustomerSelected={!!customerData}
              locationId={locationId}
              onLocationChange={onLocationChange}
            />

            <DeliveryAddress
              isCustomerSelected={!!customerData}
              deliveryAddressesList={deliveryAddressesList}
              isUseUserPhone={isUseUserPhone}
              userDeliveryAddress={userDeliveryAddress}
              onSetIsUserPhone={onSetIsUserPhone}
              setUserDeliveryAddress={setUserDeliveryAddress}
            />
          </AreaWrapper>

          <OrderDetails
            isBlocked={!isOrderAvailable}
            customerId={customerData?.id}
            locationId={locationId}
            orderItems={orderItems}
            isCutlery={isCutlery}
            handleAddOrderItem={handleAddOrderItem}
            handleRemoveOrderItem={handleRemoveOrderItem}
            setIsCutlery={setIsCutlery}
            setMenuId={setMenuId}
          />

          <VoucherCode
            isBlocked={!isOrderAvailable}
            customerId={customerData?.id}
            coupons={coupons}
            summary={summary}
            handleAddCoupon={handleAddCoupon}
            handleRemoveCoupon={handleRemoveCoupon}
          />

          <OrderSummary
            isBlocked={!isOrderAvailable}
            isBalanceError={isBalanceError}
            paymentType={paymentType}
            summary={summary}
            customerCoinsBalance={customerData?.balanceData?.fmcCentsAmount}
            setPaymentType={setPaymentType}
          />
        </FlexContainer>

        <AreaWrapper $available="laptop">
          <Store
            isCustomerSelected={!!customerData}
            locationId={locationId}
            onLocationChange={onLocationChange}
          />

          <DeliveryAddress
            isCustomerSelected={!!customerData}
            deliveryAddressesList={deliveryAddressesList}
            isUseUserPhone={isUseUserPhone}
            userDeliveryAddress={userDeliveryAddress}
            onSetIsUserPhone={onSetIsUserPhone}
            setUserDeliveryAddress={setUserDeliveryAddress}
          />
        </AreaWrapper>
      </PageFormsWrapper>

      <ConfirmDialog
        isLoading={isLoading}
        open={isOrderCreateConfirm}
        Icon={DiningIcon}
        message="Place Order"
        description="Are you sure to continue this action?"
        onCancel={() => setIsOrderCreateConfirm(false)}
        firstCTAButton={{
          title: "Confirm",
          disabled: false,
          type: "primary",
          loading: isLoading,
          onClick: handleCreateOrder,
        }}
      />
    </>
  );
};
