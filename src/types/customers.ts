export enum CustomersFilterTypes {
  firstName = "firstName",
  lastName = "lastName",
  phoneNumber = "phoneNumber",
  lastOrderDate = "lastOrderDate",
  mostOrderValue = "mostOrderValue",
  createdAtAfter = "createdAtAfter",
  loyaltyLevel = "loyaltyLevel",
}

export enum CustomersFilterNames {
  firstName = "First name",
  lastName = "Last name",
  phoneNumber = "Phone number",
  lastOrderDate = "Last order date",
  mostOrderValue = "Most order value",
  createdAtAfter = "Created after",
  loyaltyLevel = "Loyalty level",
}

export enum Gender {
  Male = "male",
  Female = "female",
}

export enum CustomerGoal {
  Lose = "lose",
  Maintain = "maintain",
  Gain = "gain",
}

export enum CustomerActivityLevelGoal {
  Sedentary = "sedentary",
  Light_activity = "light_activity",
  Moderate_activity = "moderate_activity",
  Very_active = "very_active",
}

export type CustomerHealthData = {
  weight: number;
  height: number;
  goal: CustomerGoal;
  activityLevel: CustomerActivityLevelGoal;
  perWeekWeightChange: CustomerActivityLevelGoal;
  updatedAt: string;
};

export type CustomerHealthCalculations = {
  tdee: number;
  bmr: number;
  recommendedDailyCaloriesIntake: number;
  updatedAt: string;
};

export type CustomerProfileResponseDto = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  gender: Gender | null;
  birthDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  healthData: CustomerHealthData | null;
  healthCalculations: CustomerHealthCalculations | null;
  isHealthDataQuestionnaireSkipped: boolean;
  emailVerified: boolean;
  referralsCount: number;
  isVip: boolean;
  fullName?: string | null;
  balanceData: {
    fmcCentsAmount: number | null;
    expiresAt: string | null;
  };
};

export type GetCustomersResponseDto = {
  totalCount: number;
  items: CustomerProfileResponseDto[];
};

export type CustomerMappedProfile = CustomerProfileResponseDto & {
  fullName: string | null;
};

export type GetCustomersMappedResponseDto = {
  totalCount: number;
  items: CustomerMappedProfile[];
};

export type GetCustomersAddressResponseDto = {
  additionalInfo: string;
  area: string;
  block: string;
  building: string;
  city: string;
  createdAt: string;
  flat: string;
  floor: string;
  id: string;
  isInAnyDeliveryZone: boolean;
  isSelected: boolean;
  lat: number;
  lng: number;
  name: string;
  phone: string;
  street: string;
  updatedAt: string;
};
export type NutritionInfo = {
  carbs: number;
  protein: number;
  fat: number;
};

export type CustomerMenuAddonModifier = {
  id: string;
  name: string;
  description: string;
  fiatCentsPrice: number;
  fmcCentsPrice: number;
  type: string;
  min: number;
  max: number;
  multiMax: number | null;
  calories: number | null;
  imageURL: string | null;
  tags: string[] | null;
  nutritionInfo?: NutritionInfo | null;
  isSnoozed: boolean;
  carbs?: number | null;
  protein?: number | null;
  fat?: number | null;
};

export type CustomerMenuProduct = {
  id: string;
  name: string;
  description: string;
  productStatus: string | null;
  imageURL: string | null;
  fiatCentsPrice: number;
  fmcCentsPrice: number;
  min: number;
  max: number;
  multiMax: null;
  isSnoozed: boolean;
  addons: CustomerMenuAddonModifier[];
  modifiers: CustomerMenuAddonModifier[];
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  tags: string[];
  highlights: [];
  type: "product";
  createdAt: string;
  updatedAt: string;
  subProducts: string[];
};

export type CustomerMenuCategory = {
  id: string;
  name: string;
  description: string;
  imageURL: string | null;
  createdAt: string;
  updatedAt: string;
  products: CustomerMenuProduct[];
};

export type GetCustomerMenuResponseDto = {
  locationId: string;
  locationOperatingStatus: string;
  id: string;
  name: string;
  description: string;
  availabilities: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  isAvailable: boolean;
  isCashPayment: boolean;
  isCashPaymentAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  categories: CustomerMenuCategory[];
};
