import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MeatProductionService } from './meat_production.service';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';

@Controller('meat-production')
export class MeatProductionController {
  constructor(private readonly meatProductionService: MeatProductionService) {}

  @Post('create')
  create(@Body() createMeatProductionDto: CreateMeatProductionDto) {
    return this.meatProductionService.create(createMeatProductionDto);
  }

  @Get('all')
  findAll() {
    return this.meatProductionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meatProductionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeatProductionDto: UpdateMeatProductionDto,
  ) {
    return this.meatProductionService.update(id, updateMeatProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meatProductionService.remove(id);
  }
}
