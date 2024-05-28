import { FeatureLike } from "ol/Feature";
import { Coordinate } from "ol/coordinate";
import VectorSource from "ol/source/Vector";

export enum InteractionMode {
  Polygon = "polygon",
  Point = "point",
}

export type TZone = {
  priority: number;
  name: string;
  geometry: {
    coordinates: Coordinate[][];
    type: string;
  };
};

export type TMappedZone = {
  zoneId: string;
  name: string;
  toRemove?: boolean;
  source: VectorSource<FeatureLike>;
  coordinates: Coordinate[][];
  priority: number;
};

export type MapInputData = {
  id: string;
  name: string;
  kitchenAddress: Coordinate;
  zones: TMappedZone[];
};

export type GeometryData = {
  coordinates: Coordinate[][];
  type: string;
};

export type OperatingZoneResponseDto = {
  priority: number;
  name: string;
  geometry: GeometryData;
};

export type KitchenAddressResponseDto = {
  lat: number;
  lng: number;
};

export enum ChannelLinkStatusEnum {
  Active = "active",
  Register = "register",
  Inactive = "inactive",
}

export enum OperatingStatusEnum {
  Paused = "paused",
  Online = "online",
}

export type GetLocationResponseDto = {
  id: string;
  name: string;
  deliverectLocationId: string;
  channelLinkId: string;
  channelLinkStatus: ChannelLinkStatusEnum;
  operatingZones: OperatingZoneResponseDto[];
  operatingStatus: OperatingStatusEnum;
  kitchenAddress: KitchenAddressResponseDto;
  updatedAt: string;
  createdAt: string;
};
