export type SettingsResponseDto = {
  minimumTopUpValue: number;
  minimumOrderValue: number;
};

export type SetSettingsRequestDto = {
  minimumTopUpValue: number;
  minimumOrderValue: number;
};
