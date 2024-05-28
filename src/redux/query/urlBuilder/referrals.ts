import { endpoints } from "consts";
import { generateRequestUrl } from "helpers/dataHelpers";
import { UrlQueryParams } from "types/common";

export const referralsUrlBuilder = {
  getReferralsList: ({
    id,
    query,
  }: {
    id: string;
    query: UrlQueryParams;
  }): string => {
    return generateRequestUrl(`${endpoints.referrals}/${id}/list`, query);
  },
};
