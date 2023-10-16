import mongoose from 'mongoose';
import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
} from 'class-validator';
export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumberString()
  @IsNotEmpty()
  age: number;
  @IsNumberString()
  @IsNotEmpty()
  experience: number;
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  speciality: mongoose.Schema.Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  description: string;
}
