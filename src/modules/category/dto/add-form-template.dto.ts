import { IsNotEmpty, IsObject, IsUUID } from 'class-validator';

export class AddFormTemplateDto {
  @IsNotEmpty()
  @IsObject()
  form: any;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
