import { IsString, IsOptional } from 'class-validator';
export class UpdateAnimalTypeDto {
  @IsString()
  @IsOptional()
  animal_type: string;
  @IsString()
  @IsOptional()
  description: string;
}
