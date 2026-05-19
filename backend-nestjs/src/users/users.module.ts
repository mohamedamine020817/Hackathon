import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaService } from '../common/services/prisma.service';
import { ScoreCalculatorService } from '../common/services/score-calculator.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ScoreCalculatorService],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
