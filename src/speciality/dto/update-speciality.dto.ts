import { IsOptional, IsString } from 'class-validator';

export class UpdateSpecialityDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
}
