// Claim Model with enhanced features
const { v4: uuidv4 } = require('uuid');

class Claim {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.contractId = data.contractId;
    this.userId = data.userId;
    this.type = data.type; // 'accident', 'theft', 'flood', 'fire', 'medical'
    this.status = data.status || 'pending'; // pending, under_review, approved, rejected, paid
    this.amount = data.amount || 0;
    this.description = data.description;
    this.documents = data.documents || [];
    this.estimatedAmount = data.estimatedAmount;
    this.approvedAmount = data.approvedAmount || null;
    this.priority = data.priority || 'normal'; // low, normal, high, urgent
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.resolution = data.resolution || null;
    this.timeline = data.timeline || this.initializeTimeline();
  }

  initializeTimeline() {
    return [
      {
        status: 'submitted',
        date: new Date().toISOString(),
        message: 'Sinistre enregistré'
      }
    ];
  }

  updateStatus(newStatus, message = '') {
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();
    this.timeline.push({
      status: newStatus,
      date: this.updatedAt,
      message: message || `Changement de statut: ${newStatus}`
    });
  }

  toJSON() {
    return {
      id: this.id,
      contractId: this.contractId,
      userId: this.userId,
      type: this.type,
      status: this.status,
      amount: this.amount,
      description: this.description,
      documents: this.documents,
      estimatedAmount: this.estimatedAmount,
      approvedAmount: this.approvedAmount,
      priority: this.priority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      resolution: this.resolution,
      timeline: this.timeline
    };
  }
}

module.exports = Claim;
