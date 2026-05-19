import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { ScoreCalculatorService } from '../../common/services/score-calculator.service';
import { UpdateUserDto, GetUserDto, PreventionScoreDto, UserAnalyticsDto } from '../dtos';
import type { User, Contract, Claim } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoreCalculator: ScoreCalculatorService,
  ) {}

  async getUserProfile(userId: string): Promise<GetUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.mapToGetUserDto(user);
  }

  async updateUserProfile(userId: string, data: UpdateUserDto): Promise<GetUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updateData: any = {};
    if (data.fullName) updateData.fullName = data.fullName;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.location) updateData.location = data.location;
    if (data.preferences) updateData.preferences = data.preferences;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return this.mapToGetUserDto(updatedUser);
  }

  async calculatePreventionScore(userId: string): Promise<PreventionScoreDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const contracts = await this.prisma.contract.findMany({
      where: { userId },
    });

    const claims = await this.prisma.claim.findMany({
      where: { userId },
    });

    const scoreData = this.scoreCalculator.calculatePreventionScore(user, contracts, claims);

    return {
      score: scoreData.score,
      breakdown: scoreData.breakdown,
      trend: scoreData.trend,
      riskLevel: scoreData.riskLevel,
      lastUpdated: new Date(),
    };
  }

  async getUserAnalytics(userId: string): Promise<UserAnalyticsDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const contracts = await this.prisma.contract.findMany({
      where: { userId },
    });

    const claims = await this.prisma.claim.findMany({
      where: { userId },
    });

    const totalPremiums = contracts.reduce((sum: number, c: Contract) => sum + c.premium, 0);
    const totalClaims = claims.reduce((sum: number, c: Claim) => sum + (c.approvedAmount || 0), 0);
    const avgCoverage =
      contracts.length > 0
        ? Math.round(contracts.reduce((sum: number, c: Contract) => sum + c.coverage, 0) / contracts.length)
        : 0;

    return {
      analytics: {
        totalContracts: contracts.length,
        totalPremiums: Math.round(totalPremiums * 100) / 100,
        totalClaims,
        claimsCount: claims.length,
        avgCoverage,
        xp: user.xp,
        level: user.level,
        preventionScore: user.preventionScore,
      },
      lastUpdated: new Date(),
    };
  }

  private mapToGetUserDto(user: User): GetUserDto {
    const dto = new GetUserDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.fullName = user.fullName;
    dto.age = user.age || undefined;
    dto.location = user.location || undefined;
    dto.preventionScore = user.preventionScore;
    dto.xp = user.xp;
    dto.level = user.level;
    dto.preferences = user.preferences || {};
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}
