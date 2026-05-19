import { Injectable } from '@nestjs/common';

@Injectable()
export class GamificationService {
  private userXP: Map<string, number> = new Map();
  private badges: any[] = [];

  addXP(userId: string, xpAmount: number) {
    const currentXP = this.userXP.get(userId) || 0;
    this.userXP.set(userId, currentXP + xpAmount);
    return { userId, totalXP: currentXP + xpAmount };
  }

  getXP(userId: string) {
    return { userId, xp: this.userXP.get(userId) || 0 };
  }

  awardBadge(userId: string, badge: string) {
    const awardedBadge = {
      userId,
      badge,
      awardedAt: new Date(),
    };
    this.badges.push(awardedBadge);
    return awardedBadge;
  }

  getBadges(userId: string) {
    return this.badges.filter((b) => b.userId === userId);
  }

  getLeaderboard(limit: number = 10) {
    return Array.from(this.userXP.entries())
      .sort(([, xpA], [, xpB]) => xpB - xpA)
      .slice(0, limit)
      .map(([userId, xp]) => ({ userId, xp }));
  }
}
