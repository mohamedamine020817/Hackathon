import { Injectable } from '@nestjs/common';
import type { User, Contract, Claim } from '@prisma/client';

@Injectable()
export class ScoreCalculatorService {
  calculatePreventionScore(user: User, contracts: Contract[], claims: Claim[]) {
    const weights = {
      claimsHistory: 0.30,
      contractCoverage: 0.25,
      behaviorRating: 0.20,
      appEngagement: 0.15,
      timeAsCustomer: 0.10,
    };

    const claimsScore = this.calculateClaimsScore(claims);
    const coverageScore = this.calculateCoverageScore(contracts);
    const behaviorScore = this.calculateBehaviorScore(user);
    const engagementScore = this.calculateEngagementScore(user);
    const customerDurationScore = this.calculateCustomerDurationScore(user);

    const totalScore = Math.round(
      claimsScore * weights.claimsHistory +
        coverageScore * weights.contractCoverage +
        behaviorScore * weights.behaviorRating +
        engagementScore * weights.appEngagement +
        customerDurationScore * weights.timeAsCustomer,
    );

    return {
      score: Math.max(0, Math.min(100, totalScore)),
      breakdown: {
        claimsHistory: Math.round(claimsScore * weights.claimsHistory),
        contractCoverage: Math.round(coverageScore * weights.contractCoverage),
        behaviorRating: Math.round(behaviorScore * weights.behaviorRating),
        appEngagement: Math.round(engagementScore * weights.appEngagement),
        timeAsCustomer: Math.round(customerDurationScore * weights.timeAsCustomer),
      },
      trend: this.calculateTrend(),
      riskLevel: this.getRiskLevel(totalScore),
    };
  }

  private calculateClaimsScore(claims: Claim[]): number {
    if (!claims || claims.length === 0) return 100;

    const lastYearClaims = claims.filter((c) => {
      const claimDate = new Date(c.createdAt);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return claimDate > oneYearAgo;
    });

    const penalty = lastYearClaims.length * 15;
    return Math.max(0, 100 - penalty);
  }

  private calculateCoverageScore(contracts: Contract[]): number {
    if (!contracts || contracts.length === 0) return 30;

    const averageCoverage =
      contracts.reduce((sum: number, c: Contract) => sum + (c.coverage || 0), 0) / contracts.length;
    return averageCoverage;
  }

  private calculateBehaviorScore(user: User): number {
    let score = 80;

    if (user.age && user.age > 60) score -= 10;
    if (user.age && user.age < 25) score -= 15;

    return Math.max(0, Math.min(100, score));
  }

  private calculateEngagementScore(user: User): number {
    const baseScore = Math.min((user.xp || 0) / 10, 100);
    return Math.round(baseScore);
  }

  private calculateCustomerDurationScore(user: User): number {
    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const monthsDuration = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

    const score = Math.min(monthsDuration * 2, 100);
    return Math.round(score);
  }

  private calculateTrend(): 'up' | 'stable' | 'down' {
    const trends: Array<'up' | 'stable' | 'down'> = ['up', 'stable', 'down'];
    return trends[Math.floor(Math.random() * trends.length)];
  }

  private getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'high';
    return 'critical';
  }
}
