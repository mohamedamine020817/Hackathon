import type { UserLevel } from '@prisma/client';

export class UserEntity {
  id!: string;
  email!: string;
  fullName!: string;
  phone?: string;
  age?: number;
  location?: string;
  preventionScore!: number;
  xp!: number;
  level!: UserLevel;
  preferences!: any;
  twoFactorEnabled!: boolean;
  deletedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
