import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { UpdateContractDto } from '../dtos/update-contract.dto';
import { ContractDto } from '../dtos/contract.dto';
import type { ContractType, ContractStatus } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async createContract(userId: string, data: CreateContractDto): Promise<ContractDto> {
    // Validate that user exists
    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    // Validate contract type
    const validTypes = ['AUTO', 'HOME', 'HEALTH', 'TRAVEL'];
    if (!validTypes.includes(data.type)) {
      throw new BadRequestException('Invalid contract type');
    }

    // Validate coverage percentage
    if (data.coverage < 0 || data.coverage > 100) {
      throw new BadRequestException('Coverage must be between 0 and 100');
    }

    const contract = await this.prisma.contract.create({
      data: {
        userId,
        type: data.type as ContractType,
        premium: data.premium,
        coverage: data.coverage,
        guarantees: data.guarantees,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        deductible: data.deductible || null,
        maxCoverage: data.maxCoverage || null,
        status: 'ACTIVE' as ContractStatus,
      },
    });

    return this.mapToContractDto(contract);
  }

  async getUserContracts(userId: string): Promise<ContractDto[]> {
    // Validate that user exists
    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const contracts = await this.prisma.contract.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return contracts.map((contract) => this.mapToContractDto(contract));
  }

  async getContractById(contractId: string): Promise<ContractDto> {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract || contract.deletedAt !== null) {
      throw new NotFoundException('Contract not found');
    }

    return this.mapToContractDto(contract);
  }

  async updateContract(contractId: string, data: UpdateContractDto): Promise<ContractDto> {
    // Check if contract exists
    const existingContract = await this.prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!existingContract || existingContract.deletedAt !== null) {
      throw new NotFoundException('Contract not found');
    }

    // Validate contract type if provided
    if (data.type) {
      const validTypes = ['AUTO', 'HOME', 'HEALTH', 'TRAVEL'];
      if (!validTypes.includes(data.type)) {
        throw new BadRequestException('Invalid contract type');
      }
    }

    // Validate coverage percentage if provided
    if (data.coverage !== undefined && (data.coverage < 0 || data.coverage > 100)) {
      throw new BadRequestException('Coverage must be between 0 and 100');
    }

    // Validate status if provided
    if (data.status) {
      const validStatuses = ['ACTIVE', 'INACTIVE', 'EXPIRED'];
      if (!validStatuses.includes(data.status)) {
        throw new BadRequestException('Invalid contract status');
      }
    }

    const updateData: any = {};

    if (data.type) updateData.type = data.type;
    if (data.premium !== undefined) updateData.premium = data.premium;
    if (data.coverage !== undefined) updateData.coverage = data.coverage;
    if (data.guarantees) updateData.guarantees = data.guarantees;
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    if (data.deductible !== undefined) updateData.deductible = data.deductible;
    if (data.maxCoverage !== undefined) updateData.maxCoverage = data.maxCoverage;
    if (data.status) updateData.status = data.status;

    const updatedContract = await this.prisma.contract.update({
      where: { id: contractId },
      data: updateData,
    });

    return this.mapToContractDto(updatedContract);
  }

  private mapToContractDto(contract: any): ContractDto {
    return {
      id: contract.id,
      userId: contract.userId,
      type: contract.type,
      premium: contract.premium,
      status: contract.status,
      coverage: contract.coverage,
      startDate: contract.startDate,
      endDate: contract.endDate,
      guarantees: contract.guarantees,
      deductible: contract.deductible,
      maxCoverage: contract.maxCoverage,
      createdAt: contract.createdAt,
      updatedAt: contract.updatedAt,
    };
  }
}
