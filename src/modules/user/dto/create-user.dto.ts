import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsUUID,
  MinLength,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsString()
  @MinLength(1)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'Password123!',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'URL or path to the user profile picture',
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  @MinLength(1)
  profilePicture: string;

  @ApiProperty({
    description: 'Role ID associated with the user',
    example: 'e7c75a6b-6f73-4df5-bb9d-4d0b4642b790',
  })
  @IsUUID()
  roleId: string;

  @ApiProperty({
    description: 'Whether the user receives email notifications',
    example: true,
  })
  @IsBoolean()
  emailNotifications: boolean;

  @ApiProperty({
    description: 'Whether the user receives platform notifications',
    example: false,
  })
  @IsBoolean()
  platformNotifications: boolean;

  @ApiProperty({
    description: 'Birthdate of the client',
    example: '1990-05-12',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'Gender of the client',
    example: 'male',
  })
  @IsEnum(Gender) // Asegúrate de que sea un valor del enum Gender
  gender: Gender;

  @ApiProperty({
    description: 'Address of the client',
    example: '123 Main St, Springfield',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Location description of the client',
    example: 'Near the central park',
  })
  @IsString()
  locationDescription: string;

  @ApiProperty({
    description: 'Score of the client',
    example: 4.5,
  })
  @IsNumber()
  score: number;

  @IsBoolean()
  email_confirmied: boolean;
}
