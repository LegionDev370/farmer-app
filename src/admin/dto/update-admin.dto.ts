import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';
export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  full_name: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @IsOptional()
  @IsString()
  tg_link: string;
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  confirm_password: string;
  @IsOptional()
  @IsString()
  description: string;
}
