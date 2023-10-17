import { IsString, IsOptional } from 'class-validator';
export class UpdateMilkProductionDto {
  milk_yield: number;
  @IsString()
  @IsOptional()
  milk_schedule: Date;
  @IsString()
  @IsOptional()
  milk_quality: string;
  @IsString()
  @IsOptional()
  animal_id: string;
}
