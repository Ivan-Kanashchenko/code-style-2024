import { array, date, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const slotValidation = object().shape({
  slot: array().of(
    object().shape({
      from: date().nullable().required("Time is required"),

      to: date().nullable().required("Time is required"),
    }),
  ),
});

export const resolver = yupResolver(slotValidation);
