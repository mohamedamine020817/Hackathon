import type { UserLevel } from '@prisma/client';

export class GetUserDto {
  id!: string;
  email!: string;
  fullName!: string;
  age?: number;
  location?: string;
  preventionScore!: number;
  xp!: number;
  level!: UserLevel;
  preferences!: any;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PreventionScoreDto {
  score!: number;
  breakdown!: {
    claimsHistory: number;
    contractCoverage: number;
    behaviorRating: number;
    appEngagement: number;
    timeAsCustomer: number;
  };
  trend!: 'up' | 'stable' | 'down';
  riskLevel!: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated!: Date;
}

export class UserAnalyticsDto {
  analytics!: {
    totalContracts: number;
    totalPremiums: number;
    totalClaims: number;
    claimsCount: number;
    avgCoverage: number;
    xp: number;
    level: UserLevel;
    preventionScore: number;
  };
  lastUpdated!: Date;
}
