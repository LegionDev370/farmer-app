import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateFiberProductionDto {
  @IsNumberString()
  fiber_yield: number;
  //   @IsNumberString()
  @IsNumberString()
  shearing_schedule: number;
  @IsString()
  @IsNotEmpty()
  fiber_quality: string;
  @IsNotEmpty()
  animal_id: string;
}
