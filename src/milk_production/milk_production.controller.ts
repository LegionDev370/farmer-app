import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MilkProductionService } from './milk_production.service';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';

@Controller('milk-production')
export class MilkProductionController {
  constructor(private readonly milkProductionService: MilkProductionService) {}

  @Post('create')
  create(@Body() createMilkProductionDto: CreateMilkProductionDto) {
    return this.milkProductionService.create(createMilkProductionDto);
  }

  @Get("all")
  findAll() {
    return this.milkProductionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milkProductionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMilkProductionDto: UpdateMilkProductionDto,
  ) {
    return this.milkProductionService.update(id, updateMilkProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milkProductionService.remove(id);
  }
}
