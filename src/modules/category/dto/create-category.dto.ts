import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Sports',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Template of the form for the category',
    type: 'object',
    example: {
      title: 'Contact form',
      fields: [
        {
          label: 'Name',
          type: 'text',
          placeholder: 'Enter your name',
          validation: { required: true, minLength: 3 },
        },
        {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
          validation: {
            required: true,
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
          },
        },
      ],
    },
  })
  @IsNotEmpty()
  @IsObject()
  formTemplate: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Template is active or not',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  templateIsActive?: boolean;
}
