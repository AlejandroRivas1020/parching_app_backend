import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsUUID } from 'class-validator';

export class AddFormTemplateDto {
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
  form: Record<string, any>;

  @ApiProperty({
    description: 'Id of the category to add the form to',
    type: String,
    example: 'abc123',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
