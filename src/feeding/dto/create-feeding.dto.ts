import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedingDto {
  @IsString()
  @IsNotEmpty()
  animal_id: string;
  @IsString()
  @IsNotEmpty()
  feeding_schedule: string;
  @IsString()
  @IsNotEmpty()
  type_of_feed: string;
  @IsString()
  @IsNotEmpty()
  dietary: string;
  @IsString()
  @IsNotEmpty()
  worker_id: string;
}
