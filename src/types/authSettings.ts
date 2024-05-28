import dayjs from "dayjs";

export type SettingsResponseDto = {
  allowAccountActivation: boolean;
  requireInvitation: boolean;
  forceUpdateVersion: string;
  releaseVersion: string;
  isWaitList: boolean;
  allowMenuItemsGrid: boolean;
  coupon: {
    isCoupon: boolean;
  };
};

export type SetSettingsRequestDto = {
  allowAccountActivation?: boolean;
  requireInvitation?: boolean;
  isWaitList?: boolean;
  allowMenuItemsGrid?: boolean;
};

export type UpdatePermissionRequestDto = {
  id: number;
  limit: number;
};

export type PermissionsLimitResponseDto = {
  createdAt: string;
  id: string;
  limit: number;
  name: string;
  updatedAt: string;
  _domainEvents: [];
};

export type PurposeOptionResponseDto = {
  _domainEvents: [];
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type AddPurposeRequestDto = {
  name: string;
};

export type UpdatePurposeRequestDto = {
  id: string;
  name: string;
};
