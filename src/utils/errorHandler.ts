/* eslint-disable @typescript-eslint/no-explicit-any */

import { OpenNotificationType } from "context/NotificationsContext";

import { UseFormSetError } from "react-hook-form";

import { convertToTitleCase } from "helpers/dataHelpers";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ErrorValue = string[] | string;

export type ErrorItems = Record<
  string,
  ErrorValue | Record<string, ErrorValue>[]
>;

export type GenericErrorData = {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
};

export type SelectionItemErrors = Record<string, string[]>;

export type SectionErrors = Record<number, SelectionItemErrors>;

export type FieldsErrorData = GenericErrorData & {
  errors: Record<string, string[] | SectionErrors>;
};

export type GenericResponseError = {
  status: number;
  data: ErrorItems;
};

export type FieldsResponseError = {
  data: FieldsErrorData;
};

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export const isGenericResponseError = (
  error: unknown,
): error is GenericResponseError => {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === "object" &&
    error.data !== null
  );
};

export const isErrorWithMessage = (
  error: unknown,
): error is { error: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    typeof (error as any).error === "string"
  );
};

export const isArrayOfString = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every(item => typeof item === "string");
};

export const isFieldsResponseError = (
  error: unknown,
): error is FieldsResponseError => {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === "object" &&
    error.data != null &&
    "errors" in error.data
  );
};

interface errorHandlerArgs<T> {
  error: unknown;
  setError?: UseFormSetError<T>;
  openNotification?: (args: OpenNotificationType) => void;
}

type ErrorsList = string[];
type ErrorDescriptor = { [key: string]: ErrorsList | ErrorDescriptor };

const combineKeys = (prevKey: string, key: string) => {
  if (isNaN(parseInt(key))) {
    return `${prevKey}.${key}`;
  } else {
    return `${prevKey}[${key}]`;
  }
};

export const errorValueToText = (errorValue: ErrorValue): string => {
  try {
    if (Array.isArray(errorValue)) {
      return errorValue.map(convertToTitleCase).join(" ");
    } else {
      return convertToTitleCase(errorValue);
    }
  } catch (error) {
    return `Something went wrong. The error is the following: ${JSON.stringify(
      errorValue,
      null,
      2,
    )}`;
  }
};

export const analyzeErrorDescriptor = (
  descriptor: ErrorDescriptor,
): string[] => {
  const result: string[] = [];

  const analyzer = (descriptor: ErrorDescriptor, prevKey?: string) => {
    Object.entries(descriptor).forEach(([key, value]) => {
      const currentKey = prevKey ? combineKeys(prevKey, key) : key;

      if (Array.isArray(value)) {
        result.push(`${currentKey}: ${value.join("; ")}`);
      } else if (typeof value === "object" && value != null) {
        analyzer(value, currentKey);
      } else {
        result.push(
          `${currentKey}: [UNEXPECTED TYPE: ${typeof value}]] => ${JSON.stringify(
            value,
          )}`,
        );
      }
    });
  };

  analyzer(descriptor);

  return result;
};

export const errorDescriptorToText = (descriptor: ErrorDescriptor): string => {
  try {
    const analyzedError = analyzeErrorDescriptor(descriptor);
    return analyzedError.join("\n");
  } catch (err) {
    return `Failed to analyze errors. Raw error response: ${JSON.stringify(
      descriptor,
      null,
      2,
    )}`;
  }
};

const toErrorsText = (value: SectionErrors): string[] => {
  const errorsSet = Object.values(value).reduce(
    (acc: Set<string>, error: SelectionItemErrors) => {
      Object.values(error).forEach((errors: string[] | any) => {
        if (Array.isArray(errors)) errors.forEach(error => acc.add(error));
      });
      return acc;
    },
    new Set(),
  ) as Set<string>;
  return Array.from(errorsSet);
};

const formatErrors = (errors: Record<string, string[] | SectionErrors>) => {
  let result = [];

  Object.keys(errors).forEach(field => {
    const value = errors[field];
    const errorTexts = Array.isArray(value) ? value : toErrorsText(value);

    const message = errorTexts.join(". ");

    result = [...result, { field, message }];
  });

  return result;
};

export const errorMessageHandler = (
  errors: ErrorItems,
  openNotification: (args: OpenNotificationType) => void,
) => {
  const showToastErrorMessage = (
    errorItems: ErrorItems,
    allowNestedErrors = true,
  ) => {
    if (!!errors?.message && typeof errors.message === "string") {
      openNotification({
        type: "error",
        message: errors?.message,
      });
      return;
    }

    Object.entries(errorItems).forEach(([key, value]) => {
      if (typeof value === "string" || isArrayOfString(value)) {
        const fieldName =
          key !== "non_field_errors" ? `${convertToTitleCase(key)}: ` : "";

        openNotification({
          type: "error",
          message: `${fieldName}${errorValueToText(value)}`,
        });
        return;
      } else if (Array.isArray(value) && allowNestedErrors) {
        value.forEach(item => {
          showToastErrorMessage(item, false);
        });
        return;
      } else {
        openNotification({
          type: "error",
          message: `Something wrong in the field "${convertToTitleCase(
            key,
          )}". The error is the following: ${JSON.stringify(value)}`,
        });
        return;
      }
    });
  };

  showToastErrorMessage(errors);
};

export const errorHandler = <T>({
  error,
  setError,
  openNotification,
}: errorHandlerArgs<T>) => {
  if (isFieldsResponseError(error) && setError) {
    const fieldErrors = formatErrors(error.data.errors);
    fieldErrors.forEach(({ field, message }) =>
      setError(field, { type: "custom", message }),
    );
    return;
  } else if (isGenericResponseError(error)) {
    errorMessageHandler(error.data, openNotification);
    return;
  } else if (isErrorWithMessage(error)) {
    openNotification({
      type: "error",
      message: convertToTitleCase(error.error),
    });
    return;
  } else {
    openNotification({ type: "error", message: "Something went wrong" });
    return;
  }
};
