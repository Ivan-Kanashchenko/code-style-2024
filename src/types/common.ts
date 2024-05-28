import { Permission } from "consts";
import { FC, ReactNode } from "react";

export type BaseError =
  | {
      data: string;
      status: number | undefined;
    }
  | undefined;

export type UrlQueryParams = Record<
  string,
  string | string[] | number | boolean | undefined | null
>;

export type Order = "ASC" | "DESC" | "";

export interface SvgIconConstituentValues {
  id?: string;
  fill?: string;
  strokeColor?: string;
  strokeWidth?: string;
  strokeWidth2?: string;
  strokeWidth3?: string;
  strokeFill?: string;
  fillColor?: string;
  fillColor2?: string;
  fillColor3?: string;
  fillColor4?: string;
  fillColor5?: string;
  fillColor6?: string;
  fillColor7?: string;
  imageWidth?: string;
  imageHeight?: string;
  width?: string;
  height?: string;
  rotateCenter?: number;
  onClick?: () => void;
}

export interface SidebarMenuItemType {
  Icon: FC;
  key: string;
  label: ReactNode;
  path?: string;
  type: "link" | "list";
  access?: boolean | Permission[];
  list?: {
    key: string;
    label: ReactNode;
    path: string;
    access?: boolean | Permission[];
  }[];
}

export interface SidebarMenuItemsType {
  admin: SidebarMenuItemType[];
}

export type DayType =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ImageUploadItem {
  file: Blob;
  image: string | ArrayBuffer;
}

export interface TableAction {
  title: string;
  type?: "Delete" | "Grey";
  disabled?: boolean;
  disabledIfFieldIsTrue?: string;
  loadingId?: string;
  Icon: FC<SvgIconConstituentValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (arg: any) => void;
}

export enum ELoyaltyLevelValue {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  PLATINUM = "platinum",
}

export enum ELoyaltyLevelLabel {
  bronze = "Bronze",
  silver = "Silver",
  gold = "Gold",
  platinum = "Platinum",
}

export enum EFilterDateValue {
  TODAY = "today",
  YESTERDAY = "yesterday",
  IN_THE_LAST_7_DAYS = "inTheLastSevenDays",
  IN_THE_LAST_30_DAYS = "inTheLastThirtyDays",
  IN_THE_LAST_90_DAYS = "inTheLastNinetyDays",
  IN_THE_12_MONTHS = "inTheTwelveMonths",
  CUSTOM = "custom",
}

export enum EFilterDateLabel {
  today = "Today",
  yesterday = "Yesterday",
  inTheLastSevenDays = "In the last 7 days",
  inTheLastThirtyDays = "In the last 30 days",
  inTheLastNinetyDays = "In the last 90 days",
  inTheTwelveMonths = "In the 12 months",
  custom = "Custom",
}
