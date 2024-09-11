import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  formTemplatesId?: string;
}
