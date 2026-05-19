import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { GamificationService } from '../services/gamification.service';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('xp/:userId')
  addXP(
    @Param('userId') userId: string,
    @Body() data: { xpAmount: number },
  ) {
    return this.gamificationService.addXP(userId, data.xpAmount);
  }

  @Get('xp/:userId')
  getXP(@Param('userId') userId: string) {
    return this.gamificationService.getXP(userId);
  }

  @Post('badge/:userId')
  awardBadge(
    @Param('userId') userId: string,
    @Body() data: { badge: string },
  ) {
    return this.gamificationService.awardBadge(userId, data.badge);
  }

  @Get('badges/:userId')
  getBadges(@Param('userId') userId: string) {
    return this.gamificationService.getBadges(userId);
  }

  @Get('leaderboard')
  getLeaderboard(@Query('limit') limit?: string) {
    return this.gamificationService.getLeaderboard(
      limit ? parseInt(limit, 10) : 10,
    );
  }
}
