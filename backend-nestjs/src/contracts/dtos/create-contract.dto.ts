import { IsEnum, IsNumber, IsArray, IsString, IsDateString, IsOptional, IsUUID, Min, Max } from 'class-validator';
import type { ContractType } from '@prisma/client';

export class CreateContractDto {
  @IsUUID()
  userId!: string;

  @IsEnum(['AUTO', 'HOME', 'HEALTH', 'TRAVEL'])
  type!: ContractType;

  @IsNumber()
  @Min(0.01, { message: 'Premium must be greater than 0' })
  premium!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  coverage!: number;

  @IsArray()
  @IsString({ each: true })
  guarantees!: string[];

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  deductible?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxCoverage?: number;
}
