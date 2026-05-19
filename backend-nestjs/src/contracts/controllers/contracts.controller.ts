import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ContractsService } from '../services/contracts.service';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { UpdateContractDto } from '../dtos/update-contract.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('contracts')
@UseGuards(JwtAuthGuard)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async create(@Body() createContractDto: CreateContractDto) {
    if (!createContractDto.userId) {
      throw new BadRequestException('userId is required in request body');
    }
    return this.contractsService.createContract(
      createContractDto.userId,
      createContractDto,
    );
  }

  @Get('user/:userId')
  async getUserContracts(@Param('userId') userId: string) {
    return this.contractsService.getUserContracts(userId);
  }

  @Get(':contractId')
  async getContractById(@Param('contractId') contractId: string) {
    return this.contractsService.getContractById(contractId);
  }

  @Put(':contractId')
  async updateContract(
    @Param('contractId') contractId: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.updateContract(contractId, updateContractDto);
  }
}
