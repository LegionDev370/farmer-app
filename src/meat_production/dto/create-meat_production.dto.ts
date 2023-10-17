import { IsString, IsNotEmpty, IsNumberString } from 'class-validator';
export class CreateMeatProductionDto {
  @IsNumberString()
  @IsNotEmpty()
  meat_yield: number;
  @IsString()
  @IsNotEmpty()
  slaughter_date: Date;
  @IsString()
  @IsNotEmpty()
  shearing_schedule: Date;
  @IsString()
  @IsNotEmpty()
  animal_id: string;
}
