// Lib
import { FC, memo, useState } from "react";
// Api
import { useLazyValidateCouponQuery } from "redux/query/couponsAPI";
// Hooks
import { useNotification } from "hooks";
// Types
import { Coupon } from "types/coupons";
import { SummaryData } from "../../types";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
import { renderDiscountInfo } from "../../helpers";
// Utils
import { errorHandler } from "utils/errorHandler";
// Icons
import { CurrencyIcon, TrashIcon } from "icons";
// Components
import { Input } from "components/Form";
import { ConfirmDialog } from "components/Modals";
import { BlockedState } from "../BlockedState";
// Styled
import { Button } from "styled/Buttons";
import { Typography } from "styled/Typography";
import { ContentBox, FlexContainer, HorizontalDevider } from "styled/Box";

const MAX_COUPONS_NUMBER = 1;

interface VoucherCodeProps {
  isBlocked: boolean;
  summary: SummaryData;
  coupons: Coupon[];
  customerId: string;
  handleAddCoupon: (coupon: Coupon) => void;
  handleRemoveCoupon: (id: string) => void;
}

const VoucherCodeComponent: FC<VoucherCodeProps> = ({
  isBlocked,
  coupons,
  summary,
  customerId,
  handleAddCoupon,
  handleRemoveCoupon,
}) => {
  const { openNotification } = useNotification();

  const [validate, { isFetching: isCouponValidating }] =
    useLazyValidateCouponQuery();

  const [code, setCode] = useState("");

  const [removeCouponModal, setRemoveCouponModal] = useState<Coupon | false>(
    false,
  );

  const isAdditinalCouponsNotAvailable =
    coupons.length > MAX_COUPONS_NUMBER - 1 ||
    !!coupons.find(c => c.allowMultipleUsage === false);

  const onApply = async () => {
    if (!code) {
      return;
    }

    try {
      const coupon = await validate({ customerId, couponCode: code }).unwrap();

      if (coupon) {
        if (!coupons.length) {
          handleAddCoupon(coupon);
          setCode("");
          return;
        }

        const isAlreadyUsed = coupons.find(c => c.id === coupon.id);

        if (isAlreadyUsed) {
          openNotification({
            message: "This coupons is already used",
            type: "error",
          });
        }

        if (coupon.allowMultipleUsage && !isAdditinalCouponsNotAvailable) {
          handleAddCoupon(coupon);
          setCode("");
        } else {
          openNotification({
            message: "This coupons can`t be stacked",
            type: "error",
          });
        }
      }
    } catch (error) {
      errorHandler({ error, openNotification });
    }
  };

  const onRemoveCoupon = () => {
    if (!removeCouponModal) {
      return;
    }
    handleRemoveCoupon(removeCouponModal.id);
    setRemoveCouponModal(false);
  };

  return (
    <>
      <ContentBox $column $gap={20} $position="relative">
        <Typography.H2>Voucher Code</Typography.H2>

        {!coupons?.length ? (
          <FlexContainer $gap={8} $fullwidth>
            <div style={{ width: "100%", maxWidth: 396 }}>
              <Input
                placeholder="Enter discount code"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </div>

            <Button.Form
              disabled={!code}
              loading={isCouponValidating}
              onClick={onApply}
            >
              Apply
            </Button.Form>
          </FlexContainer>
        ) : (
          <>
            <FlexContainer $fullwidth $column $gap={16}>
              {coupons.map(c => (
                <FlexContainer
                  key={c.id}
                  $align="center"
                  $fullwidth
                  $justify="space-between"
                >
                  {renderDiscountInfo(c)}
                  <FlexContainer $align="center">
                    <FlexContainer $gap={4} $align="center">
                      <CurrencyIcon />

                      <Typography.Title>
                        {`-${fixedDigitsValue(
                          summary?.couponsDiscount[c.id]?.coins,
                          1,
                        )}`}{" "}
                        |{" "}
                        {`-KD ${fixedDigitsValue(
                          summary?.couponsDiscount[c.id]?.fiat,
                          3,
                        )}`}
                      </Typography.Title>
                    </FlexContainer>

                    <FlexContainer
                      $width="88px"
                      $justify="flex-end"
                      $margin="0 0 0 24px"
                    >
                      <Button.Form
                        icon={<TrashIcon fill="#646965" />}
                        style={{ width: 40, minWidth: 40 }}
                        onClick={() => setRemoveCouponModal(c)}
                      />
                    </FlexContainer>
                  </FlexContainer>
                </FlexContainer>
              ))}
            </FlexContainer>

            {!isAdditinalCouponsNotAvailable && (
              <>
                <HorizontalDevider />

                <FlexContainer $gap={8} $fullwidth>
                  <div style={{ width: "100%", maxWidth: 396 }}>
                    <Input
                      placeholder="Add another voucher"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                    />
                  </div>

                  <Button.Form disabled={!code} onClick={onApply}>
                    Apply
                  </Button.Form>
                </FlexContainer>
              </>
            )}
          </>
        )}

        {isBlocked && <BlockedState />}
      </ContentBox>

      <ConfirmDialog
        isLoading={false}
        open={!!removeCouponModal}
        Icon={TrashIcon}
        message={
          !!removeCouponModal &&
          `${removeCouponModal.couponCode} will be removed`
        }
        description="Are you sure to continue this action?"
        onCancel={() => setRemoveCouponModal(false)}
        firstCTAButton={{
          title: "Remove Code",
          status: "danger",
          onClick: onRemoveCoupon,
        }}
      />
    </>
  );
};

export const VoucherCode = memo(VoucherCodeComponent);
