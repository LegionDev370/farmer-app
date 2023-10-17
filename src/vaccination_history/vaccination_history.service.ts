import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  VaccinationHistory,
  VaccinationHistoryDocument,
} from './schemas/vaccination_history.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class VaccinationHistoryService {
  constructor(
    @InjectModel(VaccinationHistory.name)
    private readonly vaccinationHistoryModel: Model<VaccinationHistoryDocument>,
  ) {}
  async create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    if (!mongoose.isValidObjectId(createVaccinationHistoryDto.animal_id))
      return { message: 'Invalid Animal Id' };
    if (!mongoose.isValidObjectId(createVaccinationHistoryDto.vaccine_type_id))
      return { message: 'Invalid Vaccine Type Id' };
    if (!mongoose.isValidObjectId(createVaccinationHistoryDto.worker_id))
      return { message: 'Invalid Worker Id' };
    const vaccinesHistory = await this.vaccinationHistoryModel.create(
      createVaccinationHistoryDto,
    );
    if (vaccinesHistory) {
      return {
        message: 'success',
        data: vaccinesHistory,
      };
    }
    return {
      message: 'error',
      data: null,
    };
  }

  async findAll() {
    const histories = await this.vaccinationHistoryModel
      .find()
      .populate('animal_id')
      .populate('vaccine_type_id')
      .populate({
        path: 'worker_id',
        populate: {
          path: 'speciality',
        },
      });
    if (histories.length >= 1) {
      return {
        message: 'success',
        data: histories,
      };
    }
    throw new NotFoundException('vaccination history not found');
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) return { message: 'Invalid Id' };
    const vaccinesHistory = await this.vaccinationHistoryModel.findById(id);
    if (vaccinesHistory) {
      return {
        message: 'success',
        data: vaccinesHistory,
      };
    }
    throw new NotFoundException('vaccination history not found');
  }

  async update(
    id: string,
    updateVaccinationHistoryDto: UpdateVaccinationHistoryDto,
  ) {
    if (!mongoose.isValidObjectId(id)) return { message: 'Invalid Id' };
    const updatedVaccinationHistory =
      await this.vaccinationHistoryModel.findByIdAndUpdate(
        id,
        updateVaccinationHistoryDto,
        {
          new: true,
        },
      );
    if (updatedVaccinationHistory) {
      return {
        message: 'success',
        data: updatedVaccinationHistory,
      };
    }
    throw new NotFoundException('vaccination history not found');
  }
}
