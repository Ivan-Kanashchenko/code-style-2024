import { Permission } from "consts";
import { GetManyRolesResponseDto, RolesPermissionsState } from "types/roles";

//To fix form fields
export const dotReplace = (
  str: string | Permission,
  replace: boolean,
): string => {
  if (replace) {
    return str.replaceAll(".", "$");
  } else {
    return str.replaceAll("$", ".");
  }
};

export const createFormFields = (
  permissions: Permission[] | undefined,
): string[] => {
  if (!permissions?.length) {
    return [];
  }

  return [...permissions]
    .sort((a, b) => a.localeCompare(b))
    .map(str => dotReplace(str, true));
};

export const handleInitialEditState = (
  id: string,
  permissionsData: Permission[],
  rolesData: GetManyRolesResponseDto,
  name?: string,
): RolesPermissionsState => {
  const role = rolesData?.items?.find(role => role.id === id);
  const state: RolesPermissionsState = permissionsData.reduce(
    (acc, permission) => {
      acc[dotReplace(permission, true)] = !!role?.permissions?.find(
        p => p.name === permission,
      );

      return acc;
    },
    {
      name: name || role.name,
    } as RolesPermissionsState,
  );

  return state;
};

export const handleInitialCreateState = (
  permissionsData: Permission[],
  name?: string,
): RolesPermissionsState => {
  const state: RolesPermissionsState = permissionsData.reduce(
    (acc: RolesPermissionsState, permission: Permission) => {
      acc[dotReplace(permission, true)] = false;

      return acc;
    },
    { name: name || "" } as RolesPermissionsState,
  );

  return state;
};

export const selectAllFields = (
  obj: RolesPermissionsState,
): RolesPermissionsState => {
  const { name, ...data } = obj;

  const result = {};

  for (const key in data) {
    result[key] = true;
  }

  return {
    name,

    ...result,
  } as RolesPermissionsState;
};

export const clearAllFields = (
  obj: RolesPermissionsState,
): RolesPermissionsState => {
  const { name, ...data } = obj;

  const result = {};

  for (const key in data) {
    result[key] = false;
  }

  return {
    name,
    ...result,
  } as RolesPermissionsState;
};

export const isAllChecked = (obj: RolesPermissionsState): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...data } = obj;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !obj[key]) {
      return false;
    }
  }
  return true;
};

export const isAllCleared = (obj: RolesPermissionsState): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...data } = obj;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
      return false;
    }
  }
  return true;
};

export const isNameAlreadyExist = ({
  id,
  name,
  rolesData,
}: {
  id: string;
  name: string;
  rolesData: GetManyRolesResponseDto;
}): boolean => {
  const rolesWithThisName = rolesData.items.filter(
    r => r.name.toLowerCase() === name.toLowerCase(),
  );

  if (!rolesWithThisName?.length) {
    return false;
  }

  if (id) {
    return !!rolesWithThisName.filter(r => r.id !== id)?.length;
  }

  return !!rolesWithThisName?.length;
};

export const convertToPayload = (data: RolesPermissionsState) => {
  const { name, ...booleanFields } = data;

  const checkedPermissions = Object.keys(booleanFields)
    .filter(key => booleanFields[key])
    .map(str => ({ name: dotReplace(str, false) }));

  return {
    name,
    permissions: checkedPermissions,
  };
};
