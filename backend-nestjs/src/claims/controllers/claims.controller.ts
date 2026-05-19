import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClaimsService } from '../services/claims.service';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Body() claimData: any) {
    return this.claimsService.create(claimData);
  }

  @Get()
  findAll() {
    return this.claimsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.claimsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.claimsService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.claimsService.delete(id);
  }
}
