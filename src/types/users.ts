import { RoleResponseDto } from "./roles";

export enum UserStatus {
  ACTIVATED = "true",
  DEACTIVATED = "false",
}

export enum UserStatusLabel {
  true = "Activated",
  false = "Deactivated",
}

export enum UsersFilterTypes {
  email = "email",
  phoneNumber = "phoneNumber",
  customerActivated = "customerActivated",
  roleName = "roleName",
}

export enum UsersFilterNames {
  email = "Email",
  phoneNumber = "Phone number",
  customerActivated = "Status",
  roleName = "Role",
}

export enum WaitingUserStatus {
  ACTIVE = "true",
  INACTIVE = "false",
}

export enum WaitingUserStatusLabel {
  true = "Active",
  false = "Inactive",
}

export enum WaitingUsersFilterTypes {
  email = "email",
  phoneNumber = "phoneNumber",
  city = "city",
  area = "area",
  activated = "activated",
  package = "package",
  locationId = "locationId",
}

export enum WaitingUsersFilterNames {
  email = "Email",
  phoneNumber = "Phone number",
  city = "City",
  area = "Area",
  activated = "Status",
  package = "Package",
  locationId = "Location",
}

export type UserResponseDto = {
  fullName?: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  role: RoleResponseDto;
  authProviderUID: string | null;
  customerActivated: boolean;
};

export type GetUsersResponseDto = {
  items: UserResponseDto[];
  totalCount: number;
};

export type CreateUserRequestDto = {
  firstName?: string;
  lastName?: string;
  roleName?: string;
  email: string;
  password: string;
  customerActivated: boolean;
};

export type UpdateUserRequestDto = {
  id: string;
  firstName?: string;
  lastName?: string;
  roleName?: string;
  email?: string;
  phoneNumber?: string;
  customerActivated?: boolean;
  newPassword?: string;
  emailVerified?: boolean;
  referralCode?: string;
  selectedPackage?: string;
  isUserInWaitingList?: boolean;
  isVip?: boolean;
};

export type WaitingUserResponseDto = {
  _domainEvents: [];
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  referralCode: string;
  phoneNumber: string;
  shares: string;
  referrals: string | null;
  addedAsUser: boolean;
  userId: string | null;
  city: string | null;
  area: string | null;
  selectedPackage: string | null;
};

export type GetWaitingUsersResponseDto = {
  items: WaitingUserResponseDto[];
  totalCount: number;
};

export type User = {
  id: string | null;
  authProviderUID: string | null;
  phoneNumber: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: {
    name: string | null;
    permissions: { name: string }[] | null;
  };
  customerActivated: boolean | null;
  showDebugLocationScreen: boolean | null;
  emailVerified: boolean | null;
  referralCode: string | null;
  isUserInWaitingList: boolean | null;
  selectedPackage: string | null;
  referrerCode: string | null;
};

export interface userState {
  user: User;
}
