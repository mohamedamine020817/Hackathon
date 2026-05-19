import type { ContractType, ContractStatus } from '@prisma/client';

export class ContractDto {
  id!: string;
  userId!: string;
  type!: ContractType;
  premium!: number;
  status!: ContractStatus;
  coverage!: number;
  startDate!: Date;
  endDate?: Date;
  guarantees!: string[];
  deductible?: number;
  maxCoverage?: number;
  createdAt!: Date;
  updatedAt!: Date;
}
