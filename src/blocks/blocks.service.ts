import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blocks } from './schemas/blocks.schema';
import { Model } from 'mongoose';
import { Worker } from '../worker/schemas/worker.schema';
import { CreateWorkerBlockDto } from '../worker_block/dto/create-worker_block.dto';
import { WorkerBlock } from 'src/worker_block/schemas/worker_block.schema';
@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Blocks.name) private readonly blocksModel: Model<Blocks>,
    @InjectModel(WorkerBlock.name)
    private readonly workerBlockModel: Model<WorkerBlock>,
    @InjectModel(Worker.name) private readonly workerModel: Model<Worker>,
  ) {}
  async create(createBlockDto: CreateBlockDto) {
    const block = await this.blocksModel.create(createBlockDto);
    return block;
  }
  async createWorkerBlock(createWorkerBlockDto: CreateWorkerBlockDto) {
    const data = await this.workerBlockModel.create(createWorkerBlockDto);
    const findBlock = await this.blocksModel.findById(data.block);
    const worker = await this.workerModel.findById(data.worker);
    findBlock.workers.push(worker);
    await findBlock.save();
    worker.blocks.push(findBlock);
    await worker.save();
  }

  async findAll() {
    const blocks = await this.blocksModel.find().populate('workers');
    if (blocks.length >= 1) {
      return blocks;
    }
    throw new NotFoundException('Blocks not found');
  }

  async findOne(id: string) {
    const block = await this.blocksModel.findById(id).populate('workers');
    if (block) {
      return block;
    }
    throw new NotFoundException('Block not found');
  }
  async update(id: string, updateBlockDto: UpdateBlockDto) {
    const updatedBlock = await this.blocksModel
      .findByIdAndUpdate(id, updateBlockDto, { new: true })
      .populate('workers');
    if (updateBlockDto) {
      return updatedBlock;
    }
    throw new BadRequestException('Block not updated or block does not exist');
  }
  async remove(id: string) {
    const data = await this.blocksModel.deleteOne({ _id: id });
    if (data) {
      return {
        message: 'block removed',
      };
    }
    throw new BadRequestException('block not removed or block does not exist');
  }
}
