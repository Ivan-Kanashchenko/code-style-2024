import { OrderStatus } from "types/orders";
import { theme } from "../theme";

export const orderStatusColors = {
  [OrderStatus.PENDING]: theme.color.gray,
  [OrderStatus.ACCEPTED]: theme.color.yellow,
  [OrderStatus.PREPARING]: theme.color.lightBlue,
  [OrderStatus.PREPARED]: theme.color.blue,
  [OrderStatus.READY_FOR_PICKUP]: theme.color.status.success,
  [OrderStatus.IN_DELIVERY]: theme.color.status.success,
  [OrderStatus.DELIVERED]: theme.color.status.success,
  [OrderStatus.AUTO_FINALIZED]: theme.color.status.success,
  [OrderStatus.CANCELED]: theme.color.failed,
  [OrderStatus.SCHEDULED]: theme.color.yellow,
};
