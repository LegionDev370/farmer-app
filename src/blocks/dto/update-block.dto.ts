import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class UpdateBlockDto {
  @IsOptional()
  @IsNumberString()
  number: number;
  @IsOptional()
  @IsString()
  description: string;
}
