import { IsOptional, IsString } from 'class-validator';

export class UpdateVaccineDto {
  @IsOptional()
  @IsString()
  vaccine_type: string;
  @IsOptional()
  @IsString()
  vaccine_name: string;
}
