import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Worker } from '../worker/schemas/worker.schema';
import { Speciality } from '../speciality/schemas/speciality.schema';
@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private readonly workerModel: Model<Worker>,
    @InjectModel(Speciality.name)
    private readonly specialityModel: Model<Speciality>,
  ) {}
  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality } = createWorkerDto;
    const spec = await this.specialityModel.findById(speciality);
    if (!spec) {
      throw new BadRequestException('speciality not found');
    }
    const worker = await this.workerModel.create(createWorkerDto);
    spec.workers.push(worker);
    await spec.save();
    return worker;
  }

  async findAll() {
    const workers = await this.workerModel.find().populate({
      path: 'speciality',
      populate: {
        path: 'workers',
      },
    });
    if (workers.length >= 1) {
      return workers;
    }
    throw new HttpException('workers not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const worker = await this.workerModel.findById(id).populate({
      path: 'speciality',
      populate: {
        path: 'workers',
      },
    });

    if (worker) {
      return worker;
    }
    throw new HttpException('worker not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    if (mongoose.isValidObjectId(id)) {
      if (mongoose.isValidObjectId(updateWorkerDto.speciality_id)) {
        const updatedWorker = await this.workerModel
          .findByIdAndUpdate(id, updateWorkerDto, {
            new: true,
          })
          .populate('blocks')
          .populate({
            path: 'speciality',
            populate: {
              path: 'workers',
            },
          });
        if (!updatedWorker) {
          throw new HttpException('worker not found', HttpStatus.NOT_FOUND);
        }
        return {
          message: 'worker updated successfully',
          worker: updatedWorker,
        };
      }
      throw new BadRequestException('speciality not found');
    }
    throw new BadRequestException('invalid id');
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const data = await this.workerModel.deleteOne({ _id: id });
      if (!data) {
        throw new HttpException('worker not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'worker deleted successfully',
      };
    }
    throw new BadRequestException('invalid id');
  }
}
