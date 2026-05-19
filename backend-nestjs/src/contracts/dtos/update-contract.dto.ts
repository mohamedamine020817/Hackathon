import { IsEnum, IsNumber, IsArray, IsString, IsDateString, IsOptional, Min, Max } from 'class-validator';
import type { ContractType } from '@prisma/client';

export class UpdateContractDto {
  @IsOptional()
  @IsEnum(['AUTO', 'HOME', 'HEALTH', 'TRAVEL'])
  type?: ContractType;

  @IsOptional()
  @IsNumber()
  @Min(0.01, { message: 'Premium must be greater than 0' })
  premium?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  coverage?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  guarantees?: string[];

  @IsOptional()
  @IsDateString()
  startDate?: string;

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

  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'EXPIRED'])
  status?: string;
}
