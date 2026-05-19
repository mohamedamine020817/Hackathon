// Contract Model with enhanced features
class Contract {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.type = data.type; // 'auto', 'home', 'health', 'travel'
    this.premium = data.premium;
    this.status = data.status || 'active'; // active, pending, expired, cancelled
    this.coverage = data.coverage; // percentage 0-100
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.guarantees = data.guarantees || [];
    this.documents = data.documents || [];
    this.claims = data.claims || [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.nextPaymentDate = data.nextPaymentDate || this.calculateNextPayment();
    this.deductible = data.deductible || 0;
    this.maxCoverage = data.maxCoverage || 100000;
  }

  calculateNextPayment() {
    const date = new Date(this.startDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
  }

  getStatus() {
    const today = new Date();
    const end = new Date(this.endDate);
    if (end < today) return 'expired';
    return this.status;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      premium: this.premium,
      status: this.getStatus(),
      coverage: this.coverage,
      startDate: this.startDate,
      endDate: this.endDate,
      guarantees: this.guarantees,
      documents: this.documents,
      claims: this.claims,
      createdAt: this.createdAt,
      nextPaymentDate: this.nextPaymentDate,
      deductible: this.deductible,
      maxCoverage: this.maxCoverage
    };
  }
}

module.exports = Contract;
