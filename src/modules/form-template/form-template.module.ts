import { Module } from '@nestjs/common';
import { FormTemplateService } from './form-template.service';
import { FormTemplateController } from './form-template.controller';

@Module({
  controllers: [FormTemplateController],
  providers: [FormTemplateService],
})
export class FormTemplateModule {}
