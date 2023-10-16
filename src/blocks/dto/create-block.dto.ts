import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';
export class CreateBlockDto {
  @IsNumberString()
  @IsNotEmpty()
  number: number;
  @IsString()
  @IsNotEmpty()
  description: string;
}
