import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto, GetUserDto, PreventionScoreDto, UserAnalyticsDto } from '../dtos';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUserProfile(@Param('userId') userId: string): Promise<GetUserDto> {
    return this.usersService.getUserProfile(userId);
  }

  @Put(':userId/preferences')
  async updateUserPreferences(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.usersService.updateUserProfile(userId, updateUserDto);
  }

  @Get(':userId/score')
  async getPreventionScore(@Param('userId') userId: string): Promise<PreventionScoreDto> {
    return this.usersService.calculatePreventionScore(userId);
  }

  @Get(':userId/analytics')
  async getUserAnalytics(@Param('userId') userId: string): Promise<UserAnalyticsDto> {
    return this.usersService.getUserAnalytics(userId);
  }
}
