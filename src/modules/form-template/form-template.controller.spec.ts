import { Test, TestingModule } from '@nestjs/testing';
import { FormTemplateController } from './form-template.controller';
import { FormTemplateService } from './form-template.service';

describe('FormTemplateController', () => {
  let controller: FormTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormTemplateController],
      providers: [FormTemplateService],
    }).compile();

    controller = module.get<FormTemplateController>(FormTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
