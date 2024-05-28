import { endpoints } from "consts";
import { generateRequestUrl } from "helpers/dataHelpers";
import { UrlQueryParams } from "types/common";

export const ordersUrlBuilder = {
  getOrders: ({ query }: { query: UrlQueryParams }): string => {
    return generateRequestUrl(endpoints.orders, query);
  },
  getOrder: ({ id }: { id: string }): string => {
    return `${endpoints.orders}/${id}`;
  },
};
