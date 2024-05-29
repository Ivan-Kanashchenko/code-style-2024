import dayjs from "dayjs";
import { EFilterDateValue } from "types/common";
import { FilterField, FilterStateItem } from "types/tableFilters";

export const getFiltersQuery = (filters: FilterStateItem[]) => {
  if (!filters?.length) return {};

  return filters.reduce((acc: Record<string, string>, f: FilterStateItem) => {
    if (!f.value) return { ...acc };

    if (f.field === FilterField.DATE) {
      if (
        f.name.toLowerCase().includes("after") &&
        typeof f.value === "string"
      ) {
        return {
          ...acc,
          [f.name]: dayjs(f.value).startOf("day")?.toISOString(),
        };
      }
    }

    if (f.field === FilterField.MULTISELECT_SINGLE_DATE) {
      if (
        f.name.toLowerCase().includes("after") &&
        typeof f.value === "string"
      ) {
        switch (f.value) {
          case EFilterDateValue.CUSTOM:
            return !f?.subValue?.date?.start
              ? { ...acc }
              : {
                  ...acc,
                  [f.name]: dayjs(f?.subValue?.date?.start)
                    .startOf("day")
                    ?.toISOString(),
                };

          case EFilterDateValue.TODAY:
            return {
              ...acc,
              [f.name]: dayjs().startOf("day")?.toISOString(),
            };

          case EFilterDateValue.YESTERDAY:
            return {
              ...acc,
              [f.name]: dayjs()
                .startOf("day")
                .subtract(1, "day")
                ?.toISOString(),
            };

          case EFilterDateValue.IN_THE_LAST_7_DAYS:
            return {
              ...acc,
              [f.name]: dayjs()
                .startOf("day")
                .subtract(7, "day")
                ?.toISOString(),
            };

          case EFilterDateValue.IN_THE_LAST_30_DAYS:
            return {
              ...acc,
              [f.name]: dayjs()
                .startOf("day")
                .subtract(30, "day")
                ?.toISOString(),
            };

          case EFilterDateValue.IN_THE_LAST_90_DAYS:
            return {
              ...acc,
              [f.name]: dayjs()
                .startOf("day")
                .subtract(90, "day")
                ?.toISOString(),
            };

          case EFilterDateValue.IN_THE_12_MONTHS:
            return {
              ...acc,
              [f.name]: dayjs()
                .startOf("day")
                .subtract(12, "month")
                ?.toISOString(),
            };

          default:
            break;
        }

        return { ...acc, [f.name]: dayjs(f.value).endOf("day")?.toISOString() };
      }
    }

    return {
      ...acc,
      [f.name]: f.value,
    };
  }, {});
};
