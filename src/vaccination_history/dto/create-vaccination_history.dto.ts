import { IsString, IsNotEmpty } from 'class-validator';
export class CreateVaccinationHistoryDto {
  @IsString()
  @IsNotEmpty()
  animal_id: string;
  @IsString()
  @IsNotEmpty()
  vaccine_type_id: string;
  @IsString()
  @IsNotEmpty()
  vaccinated_date: Date;
  @IsString()
  @IsNotEmpty()
  next_vaccination_date: Date;
  @IsString()
  @IsNotEmpty()
  vaccinate_photo: string;
  @IsString()
  @IsNotEmpty()
  worker_id: string;
}
