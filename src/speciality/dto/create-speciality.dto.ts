import { IsString, IsNotEmpty } from 'class-validator';
export class CreateSpecialityDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}
