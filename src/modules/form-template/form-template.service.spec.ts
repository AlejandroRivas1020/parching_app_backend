import { Test, TestingModule } from '@nestjs/testing';
import { FormTemplateService } from './form-template.service';

describe('FormTemplateService', () => {
  let service: FormTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormTemplateService],
    }).compile();

    service = module.get<FormTemplateService>(FormTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
