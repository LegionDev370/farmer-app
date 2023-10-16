import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';
export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @IsString()
  @IsNotEmpty()
  tg_link: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  confirm_password: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}
