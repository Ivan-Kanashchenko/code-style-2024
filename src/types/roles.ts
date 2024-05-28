import { Permission } from "consts";

export type RolesPermissionsState = {
  name: string;
} & Record<string, boolean>;

export type RolePermissionsResponseDto = {
  name: string;
};

export type RoleResponseDto = {
  id: string;
  name: string;
  permissions: RolePermissionsResponseDto[];
  createdAt: string;
  updatedAt: string;
};

export type GetManyRolesResponseDto = {
  items: RoleResponseDto[];
};

export type CreateRolePermissionRequestDto = {
  name: string;
};

export type CreateRoleRequestDto = {
  name: string;
  permissions: CreateRolePermissionRequestDto[];
};

export type UpdateRoleRequestDto = {
  id: string;
  name: string;
  permissions: CreateRolePermissionRequestDto[];
};
