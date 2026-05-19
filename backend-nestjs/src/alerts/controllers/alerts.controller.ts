import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AlertsService } from '../services/alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  create(@Body() alertData: any) {
    return this.alertsService.create(alertData);
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.alertsService.findByUserId(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.alertsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.alertsService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.alertsService.delete(id);
  }

  @Put(':id/dismiss')
  dismiss(@Param('id') id: string) {
    return this.alertsService.dismiss(id);
  }
}
