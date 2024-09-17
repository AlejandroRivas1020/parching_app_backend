import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

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

  @ApiPropertyOptional({
    description: 'Client ID associated with the user (optional)',
    example: 'bff1e7d4-6c24-4b6d-9e87-6b73247d03f0',
  })
  @IsOptional()
  @IsUUID()
  clientId: string;

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
}
