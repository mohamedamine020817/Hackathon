import { IsString, IsOptional, IsInt, IsObject } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsObject()
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
    language?: string;
    [key: string]: any;
  };
}
