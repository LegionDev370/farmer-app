import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FiberProduction } from './Schemas/fiber_production.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Animal } from 'src/animals/schemas/animal.eschema';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name) private fbModel: Model<FiberProduction>,
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
  ) {}
  async create(createFiberProductionDto: CreateFiberProductionDto) {
    if (!isValidObjectId(createFiberProductionDto.animal_id))
      throw new BadGatewayException('Invalid animal id');
    const animal = await this.animalModel.findById(
      createFiberProductionDto.animal_id,
    );
    if (!animal) throw new NotFoundException('Not found animal');

    return this.fbModel.create(createFiberProductionDto);
  }

  findAll() {
    return this.fbModel.find().populate('animal_id');
  }

  findOne(id: string) {
    return this.fbModel.findById(id).populate('animal_id');
  }

  update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    return this.fbModel.findByIdAndUpdate(id, updateFiberProductionDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.fbModel.findByIdAndDelete(id);
  }
}
