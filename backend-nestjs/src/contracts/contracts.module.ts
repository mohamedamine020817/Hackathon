import { Module } from '@nestjs/common';
import { ContractsController } from './controllers/contracts.controller';
import { ContractsService } from './services/contracts.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService, PrismaService],
  exports: [ContractsService],
})
export class ContractsModule {}
