import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MeatProduction } from './schemas/meat_production.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name)
    private readonly meatProductionModel: Model<MeatProduction>,
  ) {}
  async create(createMeatProductionDto: CreateMeatProductionDto) {
    if (!mongoose.isValidObjectId(createMeatProductionDto.animal_id))
      return { message: 'animal not found or invalid id' };
    const meatProduction = await this.meatProductionModel.create(
      createMeatProductionDto,
    );
    if (meatProduction) {
      return {
        message: 'success',
        data: meatProduction,
      };
    }
  }

  async findAll() {
    const meatProductions = await this.meatProductionModel.find().populate({
      path: 'animal_id',
      populate: {
        path: 'animal_type',
      },
    });

    if (meatProductions.length >= 1) {
      return {
        message: 'success',
        data: meatProductions,
      };
    }
    throw new NotFoundException('meat production not found');
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(
        'meat production not found or id is invalid',
      );
    }
    const meat_production = await this.meatProductionModel
      .findById(id)
      .populate({
        path: 'animal_id',
        populate: {
          path: 'animal_type',
        },
      });
    if (meat_production) {
      return {
        message: 'success',
        data: meat_production,
      };
    }
    throw new NotFoundException('meat production not found');
  }

  async update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(
        'meat production not found or id is invalid',
      );
    }
    const updatedData = await this.meatProductionModel.findByIdAndUpdate(
      id,
      updateMeatProductionDto,
      {
        new: true,
      },
    );
    if (updatedData) {
      return {
        message: 'success',
        data: updatedData,
      };
    }
    throw new NotFoundException('meat production not found');
  }

  async remove(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(
        'meat production not found or id is invalid',
      );
    }
    const data = await this.meatProductionModel.deleteOne({ _id: id });
    if (data.deletedCount) {
      return {
        message: 'success',
      };
    }
    throw new NotFoundException('meat production not found');
  }
}
