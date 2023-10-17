import { IsString, IsOptional } from 'class-validator';

export class UpdateVaccinationHistoryDto {
  @IsString()
  @IsOptional()
  animal_id: string;
  @IsString()
  @IsOptional()
  vaccine_type_id: string;
  @IsString()
  @IsOptional()
  vaccinated_date: Date;
  @IsString()
  @IsOptional()
  next_vaccination_date: Date;
  @IsString()
  @IsOptional()
  vaccinate_photo: string;
  @IsString()
  @IsOptional()
  worker_id: string;
}
