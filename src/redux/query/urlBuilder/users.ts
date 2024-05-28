import { endpoints } from "consts";
import { generateRequestUrl } from "helpers/dataHelpers";
import { UrlQueryParams } from "types/common";

export const usersUrlBuilder = {
  getUsers: ({ query }: { query: UrlQueryParams }): string => {
    return generateRequestUrl(endpoints.users, query);
  },
  getWaitingUsers: ({ query }: { query: UrlQueryParams }): string => {
    return generateRequestUrl(endpoints.waitingList, query);
  },
};
