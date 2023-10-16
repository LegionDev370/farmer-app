import {
  IsOptional,
  IsString,
  IsNumberString,
  IsPhoneNumber,
} from 'class-validator';
import mongoose from 'mongoose';
export class UpdateWorkerDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsOptional()
  @IsNumberString()
  age: number;
  @IsOptional()
  @IsNumberString()
  experience: number;
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  speciality_id: mongoose.Schema.Types.ObjectId;
  @IsOptional()
  @IsString()
  description: string;
}
