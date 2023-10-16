import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Speciality } from './schemas/speciality.schema';
import { Model } from 'mongoose';
import { SpecialityDocument } from './schemas/speciality.schema';
@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel(Speciality.name)
    private readonly specialityModel: Model<SpecialityDocument>,
  ) {}
  async create(createSpecialityDto: CreateSpecialityDto) {
    const createdSpeciality =
      await this.specialityModel.create(createSpecialityDto);
    return createdSpeciality;
  }

  async findAll() {
    const specialities = await this.specialityModel.find().populate('workers');
    if (specialities.length >= 1) {
      return specialities;
    }
    throw new HttpException('specialities not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const speciality = await this.specialityModel.findById(id);
    if (speciality) {
      return speciality;
    }
    throw new HttpException('speciality not found', HttpStatus.NOT_FOUND);
  }

  update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const updatedSpeciality = this.specialityModel.findByIdAndUpdate(
      id,
      updateSpecialityDto,
      {
        new: true,
      },
    );
    if (updatedSpeciality) {
      return updatedSpeciality;
    }
    throw new HttpException(
      'speciality not found or not updated',
      HttpStatus.NOT_FOUND,
    );
  }

  async remove(id: string) {
    const data = await this.specialityModel.deleteOne({ _id: id });
    if (data) {
      return {
        message: 'speciality deleted successfully',
      };
    }
    throw new HttpException(
      'speciality not found or not deleted',
      HttpStatus.NOT_FOUND,
    );
  }
}
