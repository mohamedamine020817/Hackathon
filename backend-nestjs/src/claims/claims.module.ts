import { Module } from '@nestjs/common';
import { ClaimsController } from './controllers/claims.controller';
import { ClaimsService } from './services/claims.service';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
