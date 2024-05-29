// Lib
import { FC, memo } from "react";
// Types
import { OrderPaymentType, OrderPaymentTypeLabel } from "types/orders";
import { SummaryData } from "../../types";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
// Icons
import { CurrencyIcon } from "icons";
// Components
import { SegmentedButtons } from "components";
import { ErrorState } from "../ErrorState";
import { BlockedState } from "../BlockedState";
// Styled
import { ContentBox, FlexContainer, HorizontalDashedDevider } from "styled/Box";
import { Typography } from "styled/Typography";

interface OrderSummaryProps {
  isBlocked: boolean;
  isBalanceError: boolean;
  paymentType: OrderPaymentType;
  summary: SummaryData;
  customerCoinsBalance: number | undefined;
  setPaymentType: React.Dispatch<React.SetStateAction<OrderPaymentType>>;
}

export const OrderSummaryComponent: FC<OrderSummaryProps> = ({
  isBlocked,
  isBalanceError,
  paymentType,
  summary,
  customerCoinsBalance,
  setPaymentType,
}) => {
  const { quantity, subTotal, total, deliveryFee } = summary;

  return (
    <ContentBox $column $gap={16} $position="relative">
      <Typography.H2>Order Summary</Typography.H2>

      <FlexContainer $fullwidth $column $gap={12}>
        <FlexContainer $fullwidth $gap={8} $justify="space-between">
          <FlexContainer $column $gap={12}>
            <Typography.Title>
              Subtotal items ({quantity} items)
            </Typography.Title>

            <Typography.Title>Delivery fee</Typography.Title>
          </FlexContainer>

          <FlexContainer $column $gap={12}>
            <FlexContainer $gap={4} $align="center">
              <CurrencyIcon width="24" height="24" />

              <Typography.Title>
                {fixedDigitsValue(subTotal.coins, 1)} | KD{" "}
                {fixedDigitsValue(subTotal.fiat, 3)}
              </Typography.Title>
            </FlexContainer>

            <FlexContainer $gap={4} $align="center">
              <CurrencyIcon width="24" height="24" />

              <Typography.Title>
                {fixedDigitsValue(deliveryFee.coins, 1)} | KD{" "}
                {fixedDigitsValue(deliveryFee.fiat, 3)}
              </Typography.Title>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>

        <HorizontalDashedDevider />

        <FlexContainer $fullwidth $gap={8} $justify="space-between">
          <Typography.H3>Total</Typography.H3>

          <FlexContainer $gap={4} $align="center">
            <CurrencyIcon width="24" height="24" />

            <Typography.H3>
              {fixedDigitsValue(total.coins, 1)} | KD{" "}
              {fixedDigitsValue(total.fiat, 3)}
            </Typography.H3>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer $fullwidth $align="center" $justify="space-between">
        <Typography.H3>Payment type</Typography.H3>

        <SegmentedButtons
          value={paymentType}
          setValue={(value: OrderPaymentType) => setPaymentType(value)}
          options={[
            {
              value: OrderPaymentType.FmcCents,
              label: OrderPaymentTypeLabel[OrderPaymentType.FmcCents],
            },
            {
              value: OrderPaymentType.FiatCents,
              label: OrderPaymentTypeLabel[OrderPaymentType.FiatCents],
            },
          ]}
        />
      </FlexContainer>

      {isBlocked && <BlockedState />}

      {isBalanceError && (
        <ErrorState customerCoinsBalance={customerCoinsBalance} />
      )}
    </ContentBox>
  );
};

export const OrderSummary = memo(OrderSummaryComponent);
