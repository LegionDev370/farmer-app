import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { CreateWorkerBlockDto } from 'src/worker_block/dto/create-worker_block.dto';
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post('create')
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }
  @Post('create_worker_block')
  createWorkerBlock(@Body() createWorkerBlockDto: CreateWorkerBlockDto) {
    return this.blocksService.createWorkerBlock(createWorkerBlockDto);
  }
  @Get('all')
  findAll() {
    return this.blocksService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.update(id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blocksService.remove(id);
  }
}
