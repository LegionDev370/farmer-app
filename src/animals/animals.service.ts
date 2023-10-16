import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from './schemas/animal.eschema';
import mongoose, { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { AnimalType } from 'src/animal-type/schemas/animal-type.schema';
@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name) private readonly animalModel: Model<Animal>,
    @InjectModel(AnimalType.name)
    private readonly animalTypeModel: Model<AnimalType>,
  ) {}
  async create(createAnimalDto: CreateAnimalDto) {
    if (mongoose.isValidObjectId(createAnimalDto.animal_type)) {
      const newAnimal = await this.animalModel.create(createAnimalDto);
      const updatedAnimal = await this.animalModel.findByIdAndUpdate(
        newAnimal._id,
        { unique_id: uuid() },
        { new: true },
      );
      const findAnimalType = await this.animalTypeModel.findById(
        createAnimalDto.animal_type,
      );
      if (findAnimalType) {
        findAnimalType.animals.push(updatedAnimal);
        await findAnimalType.save();
      }
      if (newAnimal) {
        return {
          message: 'Animal created successfully',
          data: updatedAnimal,
        };
      }
    }
    throw new BadRequestException('animal type invalid');
  }

  async findAll() {
    const animals = await this.animalModel
      .find()
      .populate('animal_type')
      .populate({
        path: 'animal_type',
        populate: {
          path: 'animals',
        },
      });
    return animals;
  }

  async findOne(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const Animal = await this.animalModel.findById(id).populate({
        path: 'animal_type',
        populate: {
          path: 'animals',
        },
      });
      if (!Animal) {
        throw new NotFoundException('animal not found');
      }
      return {
        message: 'animal found',
        data: Animal,
      };
    }
    throw new BadRequestException('animal id invalid');
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    if (mongoose.isValidObjectId(id)) {
      const updatedAnimal = await this.animalModel.findByIdAndUpdate(
        id,
        updateAnimalDto,
        {
          new: true,
        },
      );
      if (updatedAnimal) {
        return {
          message: 'animal updated successfully',
          data: updatedAnimal,
        };
      }
      throw new BadRequestException('animal not found');
    }
    throw new BadRequestException('animal id invalid');
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const deletedAnimal = await this.animalModel.findByIdAndDelete(id);
      if (deletedAnimal) {
        return {
          message: 'animal deleted successfully',
        };
      }
      throw new BadRequestException('animal not found');
    }
    throw new BadRequestException('animal id invalid');
  }
}
