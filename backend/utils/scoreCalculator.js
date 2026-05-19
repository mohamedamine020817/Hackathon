// Advanced Prevention Score Calculator
class ScoreCalculator {
  static calculatePreventionScore(userProfile, contracts, claims) {
    const weights = {
      claimsHistory: 0.30,      // 30% - Historique des sinistres
      contractCoverage: 0.25,   // 25% - Niveau de couverture
      behaviorRating: 0.20,     // 20% - Comportement de l'adhérent
      appEngagement: 0.15,      // 15% - Engagement app
      timeAsCustomer: 0.10      // 10% - Durée client
    };

    const claimsScore = this.calculateClaimsScore(claims);
    const coverageScore = this.calculateCoverageScore(contracts);
    const behaviorScore = this.calculateBehaviorScore(userProfile);
    const engagementScore = this.calculateEngagementScore(userProfile);
    const customerDurationScore = this.calculateCustomerDurationScore(userProfile);

    const totalScore = Math.round(
      (claimsScore * weights.claimsHistory) +
      (coverageScore * weights.contractCoverage) +
      (behaviorScore * weights.behaviorRating) +
      (engagementScore * weights.appEngagement) +
      (customerDurationScore * weights.timeAsCustomer)
    );

    return {
      score: Math.max(0, Math.min(100, totalScore)),
      breakdown: {
        claimsHistory: Math.round(claimsScore * weights.claimsHistory),
        contractCoverage: Math.round(coverageScore * weights.contractCoverage),
        behaviorRating: Math.round(behaviorScore * weights.behaviorRating),
        appEngagement: Math.round(engagementScore * weights.appEngagement),
        timeAsCustomer: Math.round(customerDurationScore * weights.timeAsCustomer)
      },
      trend: this.calculateTrend(),
      riskLevel: this.getRiskLevel(totalScore)
    };
  }

  static calculateClaimsScore(claims) {
    if (!claims || claims.length === 0) return 100;
    
    const lastYearClaims = claims.filter(c => {
      const claimDate = new Date(c.createdAt);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return claimDate > oneYearAgo;
    });

    // Pénaliser par nombre de sinistres
    const penalty = lastYearClaims.length * 15;
    return Math.max(0, 100 - penalty);
  }

  static calculateCoverageScore(contracts) {
    if (!contracts || contracts.length === 0) return 30;
    
    const averageCoverage = contracts.reduce((sum, c) => sum + (c.coverage || 0), 0) / contracts.length;
    return averageCoverage; // Score entre 0-100 basé sur couverture moyenne
  }

  static calculateBehaviorScore(userProfile) {
    let score = 80;
    
    // Ajustements selon profil
    if (userProfile.age > 60) score -= 10;
    if (userProfile.age < 25) score -= 15;
    if (userProfile.riskProfile === 'low') score += 15;
    if (userProfile.riskProfile === 'high') score -= 20;
    
    return Math.max(0, Math.min(100, score));
  }

  static calculateEngagementScore(userProfile) {
    // Basé sur XP et activité
    const baseScore = Math.min((userProfile.xp || 0) / 10, 100);
    return Math.round(baseScore);
  }

  static calculateCustomerDurationScore(userProfile) {
    const createdDate = new Date(userProfile.createdAt);
    const now = new Date();
    const monthsDuration = (now - createdDate) / (1000 * 60 * 60 * 24 * 30);
    
    const score = Math.min(monthsDuration * 2, 100);
    return Math.round(score);
  }

  static calculateTrend() {
    // En production, comparer avec score précédent
    const trends = ['up', 'stable', 'down'];
    return trends[Math.floor(Math.random() * trends.length)];
  }

  static getRiskLevel(score) {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    if (score >= 40) return 'high';
    return 'critical';
  }
}

module.exports = ScoreCalculator;
