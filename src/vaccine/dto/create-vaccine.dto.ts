import { IsString, IsNotEmpty } from 'class-validator';
export class CreateVaccineDto {
  @IsString()
  @IsNotEmpty()
  vaccine_type: string;
  @IsString()
  @IsNotEmpty()
  vaccine_name: string;
}
