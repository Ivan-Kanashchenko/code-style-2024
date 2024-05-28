import { OrderResponseDto, OrderStatusLabel } from "types/orders";

export const getCsvMappedData = (
  data: OrderResponseDto[],
): Record<string, unknown>[] => {
  return data.map(d => ({
    ...d,
    orderStatus: OrderStatusLabel[d?.orderStatus] || null,
  }));
};
