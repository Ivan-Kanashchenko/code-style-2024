// Lib
import { FC } from "react";
import { Skeleton } from "antd";
// Types
import { OrderItemResponseDto, OrderPaymentType } from "types/orders";
// Icons
import { DiningIcon } from "icons";
// Helpers
import { fixedDigitsValue } from "helpers/dataHelpers";
// Styled
import { ContentBox, FlexContainer } from "styled/Box";
import { Typography } from "styled/Typography";
import { MenuItem, Image, ImagePlaceholder } from "../styled";

interface OrderDetailProps {
  isLoading: boolean;
  data: OrderItemResponseDto[];
  paymentType: OrderPaymentType;
}

export const OrderDetail: FC<OrderDetailProps> = ({
  isLoading,
  data,
  paymentType,
}) => {
  //TODO: add product image if BE is ready
  const image = false;

  return (
    <ContentBox $column $gap={20}>
      <Typography.H2>Order detail</Typography.H2>

      {isLoading && <Skeleton active />}

      {!isLoading &&
        data?.map(
          ({
            productId,
            productName,
            quantity,
            fmcCentsPrice,
            fiatCentsPrice,
            subItems,
          }) => {
            const price =
              paymentType === OrderPaymentType.FiatCents
                ? fiatCentsPrice
                : fmcCentsPrice;

            const priceTitle =
              paymentType === OrderPaymentType.FiatCents ? "KWD" : "FM coins";

            return (
              <MenuItem key={productId} $fullwidth $padding="8px" $gap={8}>
                <div>
                  {image ? (
                    <Image src={image} />
                  ) : (
                    <ImagePlaceholder>
                      <DiningIcon height={"64px"} width={"64px"} />
                    </ImagePlaceholder>
                  )}
                </div>

                <FlexContainer $fullwidth $column $gap={8} $padding="4px 0 0 0">
                  <Typography.Title>{productName}</Typography.Title>

                  <Typography.DescriptionThin>
                    {priceTitle}: {fixedDigitsValue(price, 3)} · Quantity:{" "}
                    {quantity} items
                  </Typography.DescriptionThin>

                  {!!subItems?.length && (
                    <FlexContainer $fullwidth $column $padding="5px 0 0 0 ">
                      {subItems.map((item, i) => (
                        <Typography.DescriptionThin key={item.productId + i}>
                          {item?.productName}
                        </Typography.DescriptionThin>
                      ))}
                    </FlexContainer>
                  )}
                </FlexContainer>
              </MenuItem>
            );
          },
        )}
    </ContentBox>
  );
};
