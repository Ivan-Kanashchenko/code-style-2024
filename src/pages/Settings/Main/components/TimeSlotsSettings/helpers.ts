import { transformToTimeSlotToLocalTime } from "helpers/dataHelpers";
import { RemoveTimeSlotModalType } from "types/timeSlots";

export const getModalTitle = (data: RemoveTimeSlotModalType) => {
  if (!data) {
    return null;
  }
  return `${transformToTimeSlotToLocalTime(
    data.from,
  )} - ${transformToTimeSlotToLocalTime(data.to)} will be removed from the ${
    data.key
  } kitchen`;
};
