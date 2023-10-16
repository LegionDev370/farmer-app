import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkerBlock, WorkerBlockSchema } from './schemas/worker_block.schema';
import { WorkerSchema } from 'src/worker/schemas/worker.schema';
import { Blocks } from 'src/blocks/schemas/blocks.schema';
import BlocksSchema from '../blocks/schemas/blocks.schema';
import { Worker } from '../worker/schemas/worker.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkerBlock.name, schema: WorkerBlockSchema },
      { name: Blocks.name, schema: BlocksSchema },
      { name: Worker.name, schema: WorkerSchema },
    ]),
  ],
})
export class WorkerBlockModule {}
