import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender } from '../../client/enums/gender.enum';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password for the user. Must be at least 8 characters long.',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  // @ApiProperty({
  //   description: "URL or base64 encoded string of the user's profile picture",
  //   example: 'https://example.com/profile.jpg',
  // })
  // @IsString()
  // profilePicture: string;

  @ApiProperty({
    description: 'Address of the user',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The birth date of the user in ISO 8601 format',
    example: '1990-01-01',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: "Description of the user's location",
    example: 'Lives near the central park',
  })
  @IsString()
  locationDescription: string;
}
