export enum RoleSettingsField {
  AgentRoleRefundAddLimit = "agentRoleRefundAddLimit",
  AgentRoleBalanceExpirationLimit = "agentRoleBalanceExpirationLimit",
  ManagerRoleRefundAddLimit = "managerRoleRefundAddLimit",
  ManagerRoleBalanceExpirationLimit = "managerRoleBalanceExpirationLimit",
  AgentRoleRefundAddLimitId = "agentRoleRefundAddLimitId",
  AgentRoleBalanceExpirationLimitId = "agentRoleBalanceExpirationLimitId",
  ManagerRoleRefundAddLimitId = "managerRoleRefundAddLimitId",
  ManagerRoleBalanceExpirationLimitId = "managerRoleBalanceExpirationLimitId",
}

export type StateValues = {
  [RoleSettingsField.AgentRoleRefundAddLimit]: undefined | number;
  [RoleSettingsField.AgentRoleBalanceExpirationLimit]: undefined | number;
  [RoleSettingsField.ManagerRoleRefundAddLimit]: undefined | number;
  [RoleSettingsField.ManagerRoleBalanceExpirationLimit]: undefined | number;
  [RoleSettingsField.AgentRoleRefundAddLimitId]?: undefined | number;
  [RoleSettingsField.AgentRoleBalanceExpirationLimitId]?: undefined | number;
  [RoleSettingsField.ManagerRoleRefundAddLimitId]?: undefined | number;
  [RoleSettingsField.ManagerRoleBalanceExpirationLimitId]?: undefined | number;
};

export const initialState: StateValues = {
  [RoleSettingsField.AgentRoleRefundAddLimit]: undefined,
  [RoleSettingsField.AgentRoleBalanceExpirationLimit]: undefined,
  [RoleSettingsField.ManagerRoleRefundAddLimit]: undefined,
  [RoleSettingsField.ManagerRoleBalanceExpirationLimit]: undefined,
  [RoleSettingsField.AgentRoleRefundAddLimitId]: undefined,
  [RoleSettingsField.AgentRoleBalanceExpirationLimitId]: undefined,
  [RoleSettingsField.ManagerRoleRefundAddLimitId]: undefined,
  [RoleSettingsField.ManagerRoleBalanceExpirationLimitId]: undefined,
};

export type LoadingStateValues = Record<
  keyof Omit<
    StateValues,
    | "agentRoleRefundAddLimitId"
    | "agentRoleBalanceExpirationLimitId"
    | "managerRoleRefundAddLimitId"
    | "managerRoleBalanceExpirationLimitId"
  >,
  boolean
>;

export const initialLoadingState: LoadingStateValues = {
  [RoleSettingsField.AgentRoleRefundAddLimit]: false,
  [RoleSettingsField.AgentRoleBalanceExpirationLimit]: false,
  [RoleSettingsField.ManagerRoleRefundAddLimit]: false,
  [RoleSettingsField.ManagerRoleBalanceExpirationLimit]: false,
};
