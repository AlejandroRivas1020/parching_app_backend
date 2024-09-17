import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
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
  @MinLength(8)
  password: string;
}
