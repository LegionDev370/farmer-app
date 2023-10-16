import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  animal_type: string;
  @IsString()
  @IsNotEmpty()
  unique_id: string;
}
