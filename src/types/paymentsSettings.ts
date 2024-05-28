export type PaymentsSettingsResponseDto = {
  discount: number;
  minimumOrder: number;
  deliveryFeeFiatCents: number;
  deliveryFeeFmcCents: number;
  isCashPayment: boolean;
  availableLocations: string[];
};

export type SetPaymentsSettingsRequestDto = {
  discount: number;
  minimumOrder: number;
  deliveryFeeFiatCents: number;
  deliveryFeeFmcCents: number;
  isCashPayment: boolean;
  availableLocations: string[];
};
