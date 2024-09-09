import { PartialType } from '@nestjs/mapped-types';
import { CreateFormTemplateDto } from './create-form-template.dto';

export class UpdateFormTemplateDto extends PartialType(CreateFormTemplateDto) {}
