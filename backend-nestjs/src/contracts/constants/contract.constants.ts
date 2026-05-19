export enum ContractType {
  AUTO = 'AUTO',
  HOME = 'HOME',
  HEALTH = 'HEALTH',
  TRAVEL = 'TRAVEL',
}

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export const CONTRACT_TYPES = Object.values(ContractType);
export const CONTRACT_STATUSES = Object.values(ContractStatus);

export const COVERAGE_MIN = 0;
export const COVERAGE_MAX = 100;
export const PREMIUM_MIN = 0.01;
