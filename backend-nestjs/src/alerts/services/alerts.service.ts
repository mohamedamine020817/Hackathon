import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertsService {
  private alerts: any[] = [];

  create(alertData: any) {
    const alert = {
      id: Date.now().toString(),
      status: 'ACTIVE',
      ...alertData,
      createdAt: new Date(),
    };
    this.alerts.push(alert);
    return alert;
  }

  findAll() {
    return this.alerts;
  }

  findById(id: string) {
    return this.alerts.find((alert) => alert.id === id);
  }

  findByUserId(userId: string) {
    return this.alerts.filter((alert) => alert.userId === userId);
  }

  update(id: string, updateData: any) {
    const alert = this.findById(id);
    if (alert) {
      Object.assign(alert, updateData);
    }
    return alert;
  }

  delete(id: string) {
    const index = this.alerts.findIndex((alert) => alert.id === id);
    if (index > -1) {
      return this.alerts.splice(index, 1);
    }
    return null;
  }

  dismiss(id: string) {
    return this.update(id, { status: 'DISMISSED' });
  }
}
