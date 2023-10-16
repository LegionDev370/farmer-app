import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine } from './schemas/vaccine.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(Vaccine.name) private readonly vaccineModel: Model<Vaccine>,
  ) {}
  async create(createVaccineDto: CreateVaccineDto) {
    const findVaccine = await this.vaccineModel.findOne({
      vaccine_type: createVaccineDto.vaccine_type,
      vaccine_name: createVaccineDto.vaccine_name,
    });
    if (!findVaccine) {
      const newVaccine = await this.vaccineModel.create(createVaccineDto);
      return {
        message: 'Vaccine created successfully',
        data: newVaccine,
      };
    }
    throw new BadRequestException('Vaccine already exists');
  }

  async findAll() {
    const vaccines = await this.vaccineModel.find();
    if (vaccines.length >= 1) {
      return {
        message: 'Vaccines fetched successfully',
        data: vaccines,
      };
    }
    throw new NotFoundException('Vaccines not found');
  }

  async findOne(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const vaccine = await this.vaccineModel.findById(id);
      if (!vaccine) {
        throw new NotFoundException('Vaccine not found');
      }
      return {
        message: 'Vaccine fetched successfully',
        data: vaccine,
      };
    }
    throw new BadRequestException('Invalid id');
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    if (mongoose.isValidObjectId(id)) {
      const updateVaccined = await this.vaccineModel.findByIdAndUpdate(
        id,
        updateVaccineDto,
        {
          new: true,
        },
      );
      if (!updateVaccined) {
        throw new NotFoundException('Vaccine not found');
      }
      return {
        message: 'Vaccine updated successfully',
        data: updateVaccined,
      };
    }
    throw new BadRequestException('Invalid id');
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const data = await this.vaccineModel.deleteOne({
        _id: id,
      });
      if (!data) {
        throw new NotFoundException('Vaccine not found');
      }
      return {
        message: 'Vaccine deleted successfully',
      };
    }
    throw new BadRequestException('Invalid id');
  }
}
