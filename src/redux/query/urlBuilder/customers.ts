import { endpoints } from "consts";
import { generateRequestUrl } from "helpers/dataHelpers";
import { UrlQueryParams } from "types/common";

export const customersUrlBuilder = {
  getCustomers: ({ query }: { query: UrlQueryParams }): string => {
    return generateRequestUrl(endpoints.customer_profiles, query);
  },
  getCustomer: ({ id }: { id: string }): string => {
    return `${endpoints.customer_profiles}/${id}`;
  },
  getCustomerAddresses: ({ id }: { id: string }): string => {
    return `${endpoints.customer_profiles}/${id}/addresses`;
  },
  getCustomerMenu: ({ id }: { id: string }): string => {
    return `${endpoints.customer_profiles}/${id}/menu`;
  },
};
