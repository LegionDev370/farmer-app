import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal-type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalType } from './schemas/animal-type.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectModel(AnimalType.name)
    private readonly animalTypeModel: Model<AnimalType>,
  ) {}
  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    const findAnimalType = await this.animalTypeModel.findOne({
      animal_type: createAnimalTypeDto.animal_type,
    });
    if (!findAnimalType) {
      const newAnimalType =
        await this.animalTypeModel.create(createAnimalTypeDto);
      console.log(newAnimalType);
      return {
        message: 'Create Success',
        data: newAnimalType,
      };
    }
    throw new BadRequestException('animal_type already exist');
  }

  async findAll() {
    const animalTypes = await this.animalTypeModel.find();
    if (animalTypes.length >= 1) {
      return {
        message: 'Success',
        data: animalTypes,
      };
    }
    throw new NotFoundException('animal_types not found');
  }

  async findOne(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const animalType = await this.animalTypeModel
        .findById(id)
        .populate('animals');
      if (!animalType) {
        throw new NotFoundException('animal_type not found');
      }
      return {
        message: 'Success',
        data: animalType,
      };
    }
    throw new BadRequestException('Invalid Id');
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    if (mongoose.isValidObjectId(id)) {
      const updatedAnimalType = await this.animalTypeModel.findByIdAndUpdate(
        id,
        updateAnimalTypeDto,
        {
          new: true,
        },
      );
      if (!updatedAnimalType) {
        throw new NotFoundException('animal_type not found');
      }
      return {
        message: 'Update Success',
        data: updatedAnimalType,
      };
    }
    throw new BadRequestException('Invalid Id');
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const deletedAnimalType =
        await this.animalTypeModel.findByIdAndDelete(id);
      if (!deletedAnimalType) {
        throw new NotFoundException('animal_type not found');
      }
      return {
        message: 'Delete Success',
      };
    }
    throw new BadRequestException('Invalid Id');
  }
}
