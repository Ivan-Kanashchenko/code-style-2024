// Lib
import { FC } from "react";
import { useNavigate } from "react-router-dom";
// Types
import {
  ChargeFailureReasonLabel,
  ChargeStatusLabel,
  OrderPaymentType,
  OrderResponseDto,
  OrderStatusLabel,
} from "types/orders";
// Theme
// Constants
import { ADMIN_ROUTES } from "consts";
// Helpers
import {
  convertToTitleCase,
  estimatedDeliveryTimeCreate,
  fixedDigitsValue,
  scheduledTimeCreate,
} from "helpers/dataHelpers";
// Icons
import { PersonIcon, LocationsIcon } from "icons";
// Components
import { Badge, FilledButtonLink, SummaryField } from "components";
// Styled
import { ContentBox, FlexContainer, SummaryItemsGrid } from "styled/Box";
import { Typography } from "styled/Typography";

interface SummaryProps {
  isLoading: boolean;
  data: OrderResponseDto;
}

export const Summary: FC<SummaryProps> = ({ isLoading, data }) => {
  const {
    coupons,
    paymentType,
    fullName,
    sid,
    chargeStatus,
    orderStatus,
    chargeFailureReason,
    delivery,
    totalFmcCentsPrice,
    totalFiatCentsPrice,
    locationId,
    locationName,
    timeslot,
  } = data || {};

  const navigate = useNavigate();

  const handleOpenCustomerProfile = () => {
    navigate(`${ADMIN_ROUTES.CUSTOMERS.path}/${data?.customerId}`);
  };

  const handleOpenCouponDetails = (id: string) => {
    navigate(`${ADMIN_ROUTES.COUPONS.path}/${id}`);
  };

  const handleOpenLocation = () => {
    navigate(`${ADMIN_ROUTES.DELIVERY_AREAS.path}/${locationId}`);
  };

  return (
    <ContentBox $column $gap={20}>
      <Typography.H2>Summary</Typography.H2>

      <SummaryItemsGrid>
        <SummaryField isLoading={isLoading} label="Order number" value={sid} />

        <SummaryField
          isLoading={isLoading}
          label="Customer"
          value={
            <FilledButtonLink
              icon={<PersonIcon />}
              title={fullName || data?.customerId}
              onClick={handleOpenCustomerProfile}
            />
          }
        />

        <SummaryField
          isLoading={isLoading}
          label="Order status"
          value={orderStatus && <Badge title={OrderStatusLabel[orderStatus]} />}
        />

        <SummaryField
          isLoading={isLoading}
          label="Charge status"
          value={
            chargeStatus && <Badge title={ChargeStatusLabel[chargeStatus]} />
          }
        />

        <SummaryField
          isLoading={isLoading}
          label="Delivery partner"
          value={
            delivery?.deliveryProvider &&
            convertToTitleCase(delivery.deliveryProvider)
          }
        />

        {paymentType === OrderPaymentType.FiatCents ? (
          <SummaryField
            isLoading={isLoading}
            label="KWD"
            value={fixedDigitsValue(totalFiatCentsPrice, 3)}
          />
        ) : (
          <SummaryField
            isLoading={isLoading}
            label="FM coins"
            value={fixedDigitsValue(totalFmcCentsPrice, 3)}
          />
        )}

        {paymentType === OrderPaymentType.FiatCents ? (
          <SummaryField
            isLoading={isLoading}
            label="Delivery Fee (KWD)"
            value={fixedDigitsValue(delivery?.deliveryFeeFiatCents, 3)}
          />
        ) : (
          <SummaryField
            isLoading={isLoading}
            label="Delivery Fee (FM coins)"
            value={fixedDigitsValue(delivery?.deliveryFeeFmcCents, 3)}
          />
        )}

        <SummaryField
          isLoading={isLoading}
          label="Location"
          value={
            <FilledButtonLink
              icon={<LocationsIcon />}
              title={locationName}
              onClick={handleOpenLocation}
            />
          }
        />

        <SummaryField
          isLoading={isLoading}
          label="Scheduled"
          value={scheduledTimeCreate(timeslot)}
        />

        <SummaryField
          isLoading={isLoading}
          label="Estimated delivery time"
          value={estimatedDeliveryTimeCreate(
            delivery?.estimatedDeliveryTime,
            delivery?.estimatedDeliveryTimeEnd,
          )}
        />

        {chargeFailureReason && (
          <SummaryField
            isLoading={isLoading}
            label="Charge failure reason"
            value={
              <Badge title={ChargeFailureReasonLabel[chargeFailureReason]} />
            }
          />
        )}

        {!!coupons?.length && (
          <SummaryField
            isLoading={isLoading}
            label="Coupon code"
            value={
              <FlexContainer $gap={4}>
                {coupons.map(c => (
                  <FilledButtonLink
                    key={c.id}
                    title={c.couponCode}
                    onClick={() => handleOpenCouponDetails(c.id)}
                  />
                ))}
              </FlexContainer>
            }
          />
        )}
      </SummaryItemsGrid>
    </ContentBox>
  );
};
