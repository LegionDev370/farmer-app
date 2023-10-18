import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { Feeding } from './Schemas/feeding.schema';
import { Animal } from 'src/animals/schemas/animal.eschema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Worker } from 'src/worker/schemas/worker.schema';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Feeding.name) private readonly feedingModel: Model<Feeding>,
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    @InjectModel(Worker.name) private readonly workerModel: Model<Worker>,
  ) {}
  async create(createFeedingDto: CreateFeedingDto) {
    const { animal_id, worker_id } = createFeedingDto;
    if (!isValidObjectId(animal_id) || !isValidObjectId(worker_id))
      throw new BadRequestException('Invalid Id');
    const animal = await this.animalModel.findById(animal_id);
    const worker = await this.workerModel.findById(worker_id);
    if (!animal || !worker)
      throw new NotFoundException('Worker or Animal not found');

    return this.feedingModel.create(createFeedingDto);
  }

  findAll() {
    return this.feedingModel.find().populate('animal_id', 'worker_id');
  }

  findOne(id: string) {
    return this.feedingModel.findById(id).populate('animal_id', 'worker_id');
  }

  update(id: string, updateFeedingDto: UpdateFeedingDto) {
    return this.feedingModel
      .findByIdAndUpdate(id, updateFeedingDto, { new: true })
      .populate('animal_id', 'worker_id');
  }

  remove(id: string) {
    return this.feedingModel.findByIdAndDelete(id);
  }
}
