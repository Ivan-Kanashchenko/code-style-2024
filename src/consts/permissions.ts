export enum Permission {
  /* Orders section */
  OrdersGet = "orders.get",
  OrdersCreate = "orders.create",
  /* Roles section */
  PermissionsGet = "permissions.get",
  RolesGet = "roles.get",
  RolesCreate = "roles.create",
  RolesUpdate = "roles.update",
  RolesDelete = "roles.delete",
  /* Settings section */
  WaitingListUpdate = "waiting-list-settings.update",
  ExchangeRateUpdate = "exchange-rate.update",
  BalanceExpirationUpdate = "balance-expiration.update",
  SettingsGet = "settings.get",
  SettingsUpdate = "settings.update",
  /* SettingsPurpose */
  SettingsPurposeGet = "settings-purpose.get",
  SettingsPurposeCreate = "settings-purpose.create",
  SettingsPurposeUpdate = "settings-purpose.update",
  SettingsPurposeDelete = "settings-purpose.delete",
  /* SettingsTimeSlots */
  SettingsTimeSlotsGet = "settings-time-slot.get",
  SettingsTimeSlotsCreate = "settings-time-slot.create",
  SettingsTimeSlotsUpdate = "settings-time-slot.update",
  SettingsTimeSlotsDelete = "settings-time-slot.delete",
  /* SettingsCashPayment */
  SettingsPaymentsGet = "settings-payment.get",
  SettingsPaymentsUpdate = "settings-payment.update",
  /* SettingsReferrals */
  SettingsReferralsGet = "settings-referrals.get",
  SettingsReferralsUpdate = "settings-referrals.update",
  /* SettingsScheduleOrder */
  SettingsScheduleOrderGet = "settings-schedule-order.get",
  SettingsScheduleOrderUpdate = "settings-schedule-order.update",
  /* SettingsCoupons */
  SettingsCouponsGet = "settings-coupons.get",
  SettingsCouponsUpdate = "settings-coupons.update",
  /* SettingsMenuGrid */
  SettingsMenuGridGet = "settings-menu-grid.get",
  SettingsMenuGridUpdate = "settings-menu-grid.update",
}

export const initialPermissions = {
  /* Orders */
  canOrdersGet: false,
  canOrdersCreate: false,

  /* Roles section */
  canPermissionsGet: false,
  canRolesGet: false,
  canRolesCreate: false,
  canRolesUpdate: false,
  canRolesDelete: false,

  /* Settings section */
  canUpdateWaitingListSettings: false,
  canExchangeRateUpdate: false,
  canBalanceExpirationUpdate: false,
  canSettingsGet: false,
  canSettingsUpdate: false,
  сanPurposeGet: false,
  canPurposeCreate: false,
  canPurposeUpdate: false,
  canPurposeDelete: false,
  canTimeSlotsGet: false,
  canTimeSlotsCreate: false,
  canTimeSlotsUpdate: false,
  canTimeSlotsDelete: false,
  canPaymentSettingsGet: false,
  canPaymentSettingsUpdate: false,

  canReferralsSettingsGet: false,
  canReferralsSettingsUpdate: false,
  canScheduleOrderSettingsGet: false,
  canScheduleOrderSettingsUpdate: false,

  canCouponsSettingsGet: false,
  canCouponsSettingsUpdate: false,
  canMenuGridSettingsGet: false,
  canMenuGridSettingsUpdate: false,
};

export const permissionLabel: Record<Permission, string> = {
  [Permission.WaitingListUpdate]: "Edit Waiting List Settings",
  [Permission.BalanceExpirationUpdate]: "Edit Expiration balance",
  [Permission.ExchangeRateUpdate]: "Edit Exchange rate",
  [Permission.OrdersGet]: "Check Orders",
  [Permission.OrdersCreate]: "Create Orders",
  [Permission.PermissionsGet]: "Check Permissions",
  [Permission.RolesCreate]: "Create Roles",
  [Permission.RolesDelete]: "Delete Roles",
  [Permission.RolesGet]: "Check Roles",
  [Permission.RolesUpdate]: "Edit Roles",
  [Permission.SettingsGet]: "Check Settings",
  [Permission.SettingsUpdate]: "Edit Settings",
  [Permission.SettingsPurposeGet]: "Check Purpose settings",
  [Permission.SettingsPurposeCreate]: "Create Purpose settings",
  [Permission.SettingsPurposeUpdate]: "Edit Purpose settings",
  [Permission.SettingsPurposeDelete]: "Delete Purpose settings",
  [Permission.SettingsTimeSlotsGet]: "Check Time Slots settings",
  [Permission.SettingsTimeSlotsCreate]: "Create Time Slots settings",
  [Permission.SettingsTimeSlotsUpdate]: "Edit Time Slots settings",
  [Permission.SettingsTimeSlotsDelete]: "Delete Time Slots settings",
  [Permission.SettingsPaymentsGet]: "Check Payment settings",
  [Permission.SettingsPaymentsUpdate]: "Edit Payment settings",
  [Permission.SettingsReferralsGet]: "Check Referrals settings",
  [Permission.SettingsReferralsUpdate]: "Edit Referrals settings",
  [Permission.SettingsScheduleOrderGet]: "Check Schedule Order settings",
  [Permission.SettingsScheduleOrderUpdate]: "Edit Schedule Order settings",
  [Permission.SettingsCouponsGet]: "Check Coupons settings",
  [Permission.SettingsCouponsUpdate]: "Edit Coupons settings",
  [Permission.SettingsMenuGridGet]: "Check Menu Grid settings",
  [Permission.SettingsMenuGridUpdate]: "Edit Menu Grid settings",
};
