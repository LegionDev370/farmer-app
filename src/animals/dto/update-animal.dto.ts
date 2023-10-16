import { IsOptional, IsString } from 'class-validator';
export class UpdateAnimalDto {
  @IsOptional()
  @IsString()
  animal_type: string;
}
