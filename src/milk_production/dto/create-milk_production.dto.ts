import { IsString } from 'class-validator';

export class CreateMilkProductionDto {
  milk_yield: number;
  @IsString()
  milk_schedule: Date;
  @IsString()
  milk_quality: string;
  @IsString()
  animal_id: string;
}
