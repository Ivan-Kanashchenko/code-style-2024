import dayjs from "dayjs";

export enum KitchenType {
  All = "all",
  Cold = "cold",
  Hot = "hot",
}

export type EditIndexType = Record<KitchenType, number | null>;

export type TimeSlotType = {
  from?: dayjs.Dayjs | null;
  to?: dayjs.Dayjs | null;
};

export type RemoveTimeSlotModalType =
  | (TimeSlotType & { i: number; key: KitchenType })
  | null;

export type TimeSlotsForm = {
  slot: TimeSlotType[];
};

export type KitchenSlot = {
  id: number;
  type: KitchenType;
  timeSlots: TimeSlotType[];
};

export type KitchenSlots = Record<KitchenType, KitchenSlot>;

export type GetTimeSlotsResponseDto = {
  id: number;
  type: KitchenType;
  timeSlots: string[];
}[];

export type UpdateTimeSlotsRequestDto = {
  timeSlots: string[];
  type: KitchenType;
};

export type UpdateTimeSlotsResponseDto = {
  createdAt: string;
  id: string;
  timeSlots: string[];
  updatedAt: string;
  _domainEvents: [];
};
