import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role', maxLength: 50 })
  @ApiPropertyOptional({ example: 'superAdmin' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
