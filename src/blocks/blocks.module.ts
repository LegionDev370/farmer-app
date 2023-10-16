import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Blocks } from './schemas/blocks.schema';
import BlocksSchema from './schemas/blocks.schema';
import { Worker } from '../worker/schemas/worker.schema';
import { WorkerSchema } from 'src/worker/schemas/worker.schema';
import {
  WorkerBlock,
  WorkerBlockSchema,
} from 'src/worker_block/schemas/worker_block.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blocks.name, schema: BlocksSchema },
      {
        name: WorkerBlock.name,
        schema: WorkerBlockSchema,
      },
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
    ]),
  ],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
