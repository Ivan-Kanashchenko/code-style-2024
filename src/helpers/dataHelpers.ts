import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { TABLE_DATE } from "consts";

import { EFilterDateValue, UrlQueryParams } from "types/common";
import { TimeSlotsForm, TimeSlotType } from "types/timeSlots";
import { theme } from "theme";
import { UserDeliveryAddressForm } from "types/orders";

dayjs.extend(utc);
dayjs.extend(timezone);

export const convertToTitleCase = (str: string): string => {
  const valueUpperCase = `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  return valueUpperCase.replace(/_/g, " ");
};

export const isMatch = (arg1: unknown, arg2: unknown) =>
  JSON.stringify(arg1) === JSON.stringify(arg2);

export const convertStatusToText = (status: string) => {
  if (!status) return null;
  return status.replaceAll("_", " ");
};

export const generateRequestUrl = (
  url: string,
  queryParams?: UrlQueryParams,
): string => {
  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => {
        //for current BE pagination
        if (key === "page") {
          return `${"offset"}=${encodeURIComponent(
            (
              ((+value as number) - 1) *
              (queryParams?.limit as number)
            ).toString(),
          )}`;
        }
        return value
          ? `${key}=${encodeURIComponent(value.toString())}`
          : undefined;
      })
      .filter(Boolean)
      .join("&");

    return `${url}?${queryString}`;
  }

  return url;
};

export const dateTransform = ({
  date,
  format = TABLE_DATE,
}: {
  date: string | Date | dayjs.Dayjs | null;
  format?: string;
}) => {
  if (!date) {
    return null;
  }
  return dayjs(date).format(format);
};

export const dateCreate = (
  date?: string | Date | dayjs.Dayjs,
  isUTCDisabled?: boolean,
): dayjs.Dayjs => {
  if (date === null) {
    return;
  }
  if (!date) {
    return isUTCDisabled
      ? dayjs(Date.now()).local()
      : dayjs.utc(Date.now()).local();
  }
  return isUTCDisabled ? dayjs(date).local() : dayjs.utc(date).local();
};

export const scheduledTimeCreate = (time: string | undefined) => {
  if (!time) return null;

  const timeValues = time.split("-");

  const timeFrom = timeValues[0].split(":");
  const timeTo = timeValues[1].split(":");

  const formattedFrom = dayjs
    .utc()
    .set("hour", Number(timeFrom[0]))
    .set("minutes", Number(timeFrom[1]))
    .local()
    .format("h:mm A");
  const formattedTo = dayjs
    .utc()
    .set("hour", Number(timeTo[0]))
    .set("minutes", Number(timeTo[1]))
    .local()
    .format("h:mm A");

  return `${formattedFrom}-${formattedTo}`;
};

export const estimatedDeliveryTimeCreate = (
  start: string | null | undefined,
  end: string | null | undefined,
) => {
  if (!start) {
    return null;
  }

  const startTime = dateTransform({ date: start, format: "h:mm A" });

  const endTime = end
    ? dateTransform({ date: end, format: "h:mm A" })
    : dayjs(start).add(30, "minutes").format("h:mm A");

  return `${startTime} - ${endTime}`;
};

export const dateTransformToRequestFormat = (
  date: dayjs.Dayjs,
  utc?: boolean,
) => {
  return utc ? dayjs.utc(date).toISOString() : date.toISOString();
};

export const getRageDate = (value: EFilterDateValue | string) => {
  switch (value) {
    case EFilterDateValue.TODAY:
      return {
        pickupTimeBefore: dayjs().startOf("day").toISOString(),
        pickupTimeAfter: dayjs().endOf("day").toISOString(),
      };
    case EFilterDateValue.YESTERDAY:
      return {
        pickupTimeBefore: dateCreate()
          .subtract(1, "day")
          .startOf("day")
          .toISOString(),
        pickupTimeAfter: dateCreate()
          .subtract(1, "day")
          .endOf("day")
          .toISOString(),
      };
    case EFilterDateValue.IN_THE_LAST_7_DAYS:
      return {
        pickupTimeBefore: dayjs()
          .subtract(8, "day")
          .startOf("day")
          .toISOString(),
        pickupTimeAfter: dayjs().subtract(1, "day").endOf("day").toISOString(),
      };
    case EFilterDateValue.IN_THE_LAST_30_DAYS:
      return {
        pickupTimeBefore: dayjs()
          .subtract(31, "day")
          .startOf("day")
          .toISOString(),
        pickupTimeAfter: dayjs().subtract(1, "day").endOf("day").toISOString(),
      };
    case EFilterDateValue.IN_THE_LAST_90_DAYS:
      return {
        pickupTimeBefore: dayjs()
          .subtract(91, "day")
          .startOf("day")
          .toISOString(),
        pickupTimeAfter: dayjs().subtract(1, "day").endOf("day").toISOString(),
      };
    case EFilterDateValue.IN_THE_12_MONTHS:
      return {
        pickupTimeBefore: dayjs()
          .subtract(12, "month")
          .subtract(1, "day")
          .startOf("day")
          .toISOString(),
        pickupTimeAfter: dayjs().subtract(1, "day").endOf("day").toISOString(),
      };
    default:
      return {
        pickupTimeBefore: dayjs().startOf("day").toISOString(),
        pickupTimeAfter: dayjs().endOf("day").toISOString(),
      };
  }
};

export const getFullName = ({
  firstName,
  lastName,
}: {
  firstName: string | null;
  lastName: string | null;
}): string | null => [firstName, lastName].filter(Boolean).join(" ") || null;

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
};

export const generateUniqueId = (): string => {
  const timestamp = new Date().getTime().toString(16);
  const randomNum = (Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
  return `${timestamp}-${randomNum}`;
};

export const convertToTimeSlotFormValues = (data: string[]): TimeSlotType[] => {
  if (!data?.length) {
    return [];
  }
  const formattedTime = data.map(el => {
    const time = el.split("-");

    const [hoursFrom, minutesFrom] = time[0].split(":");
    const [hoursTo, minutesTo] = time[1].split(":");

    return {
      from: dayjs
        .utc()
        .set("hours", Number(hoursFrom))
        .set("minutes", Number(minutesFrom))
        .local(),
      to: dayjs
        .utc()
        .set("hours", Number(hoursTo))
        .set("minutes", Number(minutesTo))
        .local(),
    };
  });
  return formattedTime;
};

export const formatTimeValue = (time: number): string => {
  const value = time.toString();

  if (value.length === 1) {
    return `0${value}`;
  }

  return value;
};

export const transformToTimeSlotRequest = (data: TimeSlotsForm): string[] => {
  const requestData = data.slot.reduce((acc, item) => {
    if (item.from !== null && item.to !== null) {
      const hoursFrom = dayjs.utc(item.from).get("hours");
      const minutesFrom = dayjs.utc(item.from).get("minutes");

      const hoursTo = dayjs.utc(item.to).get("hours");
      const minutesTo = dayjs.utc(item.to).get("minutes");

      return [
        ...acc,
        `${formatTimeValue(hoursFrom)}:${formatTimeValue(
          minutesFrom,
        )} - ${formatTimeValue(hoursTo)}:${formatTimeValue(minutesTo)}`,
      ];
    }

    return acc;
  }, []);

  return requestData;
};

export const transformToTimeSlotToLocalTime = (date: dayjs.Dayjs): string => {
  const hours = dayjs(date).get("hours");
  const minutes = dayjs(date).get("minutes");

  return `${formatTimeValue(hours)}:${formatTimeValue(minutes)}`;
};

export const fixedDigitsValue = (
  data: number | string | undefined,
  digits?: number,
): string | number => {
  if (typeof data === "number") {
    if (digits) {
      return data?.toFixed(digits);
    }

    return data;
  }
  if (typeof data === "string") {
    if (digits) {
      return Number(data)?.toFixed(digits);
    }

    return data;
  }

  return data;
};

export const getCouponBadgeStatus = (startDate: string, expiryDate: string) => {
  const currentDate = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(expiryDate);

  if (currentDate.isBefore(start)) {
    return {
      title: "Scheduled",
      bgColor: theme.color.gray,
      textColor: theme.color.white,
    };
  } else if (currentDate.isBefore(end)) {
    return {
      title: "Started",
      bgColor: theme.color.active,
      textColor: theme.color.brand,
    };
  } else {
    return {
      title: "Expired",
      bgColor: theme.color.error,
      textColor: theme.color.white,
    };
  }
};

export const removeHashContent = (input: string): string => {
  return input.replace(/#.*?#/g, "").trim();
};

export const splitPhoneNumber = (
  phoneNumber: string | null,
): {
  phoneCode: string;
  phone: string;
} | null => {
  if (!phoneNumber) {
    return null;
  }
  const phoneNumberRegex = /^(\+\d{1,3})(\d+)$/;
  const matches = phoneNumber.match(phoneNumberRegex);

  if (!matches) {
    null;
  }

  return {
    phoneCode: matches[1].slice(1),
    phone: matches[2],
  };
};

export const isUserDeliveryAddressValid = (
  address: UserDeliveryAddressForm,
): boolean => {
  if (!address) {
    return false;
  }
  const requiredFields = ["city", "area", "block", "street", "building"];

  return requiredFields.every(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    field => address[field as keyof UserDeliveryAddressForm]?.trim() !== "",
  );
};
