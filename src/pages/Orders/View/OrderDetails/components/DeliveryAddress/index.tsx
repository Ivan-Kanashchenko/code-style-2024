// Lib
import { FC } from "react";
// Types
import { DeliveryResponseDto } from "types/orders";
// Components
import { SummaryField } from "components";
// Styled
import { ContentBox, SummaryItemsGrid } from "styled/Box";
import { Typography } from "styled/Typography";

interface DeliveryAddressProps {
  isLoading: boolean;
  data: DeliveryResponseDto;
}

export const DeliveryAddress: FC<DeliveryAddressProps> = ({
  isLoading,
  data,
}) => {
  const {
    name,
    city,
    area,
    block,
    street,
    building,
    floor,
    flat,
    phone,
    additionalInfo,
  } = data?.deliveryAddress || {};

  return (
    <ContentBox $column $gap={20}>
      <Typography.H2>Delivery Address</Typography.H2>

      <SummaryItemsGrid>
        <SummaryField isLoading={isLoading} label="Name" value={name} />

        <SummaryField isLoading={isLoading} label="City" value={city} />

        <SummaryField isLoading={isLoading} label="Area" value={area} />

        <SummaryField isLoading={isLoading} label="Block" value={block} />

        <SummaryField isLoading={isLoading} label="Street" value={street} />

        <SummaryField isLoading={isLoading} label="Building" value={building} />

        <SummaryField isLoading={isLoading} label="Floor" value={floor} />

        <SummaryField isLoading={isLoading} label="Flat" value={flat} />

        <SummaryField isLoading={isLoading} label="Phone" value={phone} />

        <SummaryField
          isLoading={isLoading}
          label="Additional info"
          value={additionalInfo}
        />
      </SummaryItemsGrid>
    </ContentBox>
  );
};
