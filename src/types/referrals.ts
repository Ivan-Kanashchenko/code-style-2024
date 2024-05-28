export type Invitee = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  roleName: string;
  isVip: boolean;
  isPay: boolean;
  gender: string;
  birthDate: string;
  healthData: {
    weight: number;
    height: number;
    stepGoal: number;
    goal: string;
    activityLevel: string;
    perWeekWeightChange: string;
    updatedAt: string;
  };
  healthCalculations: {
    tdee: number;
    bmr: number;
    recommendedDailyCaloriesIntake: number;
    updatedAt: string;
  };
  isHealthDataQuestionnaireSkipped: boolean;
  minVoucherAvailable: boolean;
  emailVerified: boolean | null;
  __v: number;
  referralsCount: number;
};

export type RefferalResponseDto = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  inviterId: string;
  inviteeId: Invitee | null;
  bonusForInviter: number;
  bonusForInvitee: number;
  __v: number;
};

export type GetReferralsResponseDto = {
  items: RefferalResponseDto[];
  totalCount: number;
};

export type ReferralsSettingsDto = {
  isReferralBonus: boolean;
  bonusForInvitee: number;
  bonusForInviter: number;
};
