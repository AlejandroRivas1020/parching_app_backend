import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender } from '../../client/enums/gender.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  profilePicture: string;

  @IsString()
  address: string;

  @IsDateString()
  birthDate: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  locationDescription: string;
}
