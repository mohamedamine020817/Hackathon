// User Model with enhanced features
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.age = data.age;
    this.location = data.location;
    this.profilePicture = data.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`;
    this.contracts = data.contracts || [];
    this.xp = data.xp || 0;
    this.level = this.calculateLevel(data.xp || 0);
    this.preventionScore = data.preventionScore || 0;
    this.riskProfile = data.riskProfile || 'medium';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.lastUpdate = data.lastUpdate || new Date().toISOString();
    this.preferences = data.preferences || {
      notifications: true,
      newsletter: true,
      language: 'fr'
    };
  }

  calculateLevel(xp) {
    if (xp >= 1000) return 'Platine';
    if (xp >= 800) return 'Or';
    if (xp >= 500) return 'Argent';
    return 'Bronze';
  }

  addXP(points) {
    this.xp += points;
    this.level = this.calculateLevel(this.xp);
    this.lastUpdate = new Date().toISOString();
    return { xp: this.xp, level: this.level };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      age: this.age,
      location: this.location,
      profilePicture: this.profilePicture,
      contracts: this.contracts,
      xp: this.xp,
      level: this.level,
      preventionScore: this.preventionScore,
      riskProfile: this.riskProfile,
      preferences: this.preferences,
      createdAt: this.createdAt,
      lastUpdate: this.lastUpdate
    };
  }
}

module.exports = User;
