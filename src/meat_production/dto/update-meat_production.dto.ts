import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class UpdateMeatProductionDto {
  @IsNumberString()
  @IsOptional()
  meat_yield: number;
  @IsString()
  @IsOptional()
  slaughter_date: Date;
  @IsString()
  @IsOptional()
  shearing_schedule: Date;
  @IsString()
  @IsOptional()
  animal_id: string;
}
