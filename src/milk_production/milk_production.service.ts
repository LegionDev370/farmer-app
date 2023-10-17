import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  MilkProduction,
  MilkProductionDocument,
} from './schemas/milk_production.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(MilkProduction.name)
    private readonly milkProductionModel: Model<MilkProductionDocument>,
  ) {}
  async create(createMilkProductionDto: CreateMilkProductionDto) {
    if (!mongoose.isValidObjectId(createMilkProductionDto.animal_id)) {
      throw new BadRequestException('Invalid animal id or animal not found');
    }
    const createdMilkProduction = await this.milkProductionModel.create(
      createMilkProductionDto,
    );
    if (createdMilkProduction) {
      return {
        message: 'success',
        data: createdMilkProduction,
      };
    }
  }

  async findAll() {
    const milkProductions = await this.milkProductionModel.find().populate({
      path: 'animal_id',
      populate: {
        path: 'animal_type',
      },
    });
    if (milkProductions.length >= 1) {
      return {
        message: 'success',
        data: milkProductions,
      };
    }
    throw new NotFoundException('milk productions not found');
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id or milk production not found');
    }
    const milkProduction = await this.milkProductionModel
      .findById(id)
      .populate({
        path: 'animal_id',
        populate: {
          path: 'animal_type',
        },
      });
    if (milkProduction) {
      return {
        message: 'success',
        data: milkProduction,
      };
    }
    throw new NotFoundException('milk production not found');
  }

  async update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id or milk production not found');
    }
    const updatedMilkProduction =
      await this.milkProductionModel.findByIdAndUpdate(
        id,
        updateMilkProductionDto,
        {
          new: true,
        },
      );
    if (updatedMilkProduction) {
      return {
        message: 'success',
        data: updatedMilkProduction,
      };
    }
    throw new NotFoundException('milk production not found');
  }

  async remove(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id or milk production not found');
    }
    const remove = await this.milkProductionModel.deleteOne({ _id: id });
    if (remove.deletedCount) {
      return {
        message: 'success',
      };
    }
    throw new NotFoundException('milk production not found');
  }
}
