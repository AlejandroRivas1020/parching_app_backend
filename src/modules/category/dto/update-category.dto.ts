import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'hello world' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ example: 'abc123' })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ example: 'abc1234' })
  @IsOptional()
  @IsUUID()
  formTemplatesId?: string;
}
