import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimalTypeDto {
  @IsString()
  @IsNotEmpty()
  animal_type: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}
