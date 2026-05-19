import { Injectable } from '@nestjs/common';

@Injectable()
export class ClaimsService {
  private claims: any[] = [];

  create(claimData: any) {
    const claim = {
      id: Date.now().toString(),
      status: 'PENDING',
      ...claimData,
      createdAt: new Date(),
    };
    this.claims.push(claim);
    return claim;
  }

  findAll() {
    return this.claims;
  }

  findById(id: string) {
    return this.claims.find((claim) => claim.id === id);
  }

  update(id: string, updateData: any) {
    const claim = this.findById(id);
    if (claim) {
      Object.assign(claim, updateData);
    }
    return claim;
  }

  delete(id: string) {
    const index = this.claims.findIndex((claim) => claim.id === id);
    if (index > -1) {
      return this.claims.splice(index, 1);
    }
    return null;
  }
}
