import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, FormTemplate } from './entities';
import type { AddFormTemplateDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(FormTemplate)
    private readonly formTemplatesRepository: Repository<FormTemplate>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, formTemplate } = createCategoryDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newCategory = queryRunner.manager.create(Category, { name });
      await queryRunner.manager.save(Category, newCategory);

      const newFormTemplate = queryRunner.manager.create(FormTemplate, {
        form: formTemplate,
        category: newCategory,
        isActive: true,
      });
      await queryRunner.manager.save(FormTemplate, newFormTemplate);
      await queryRunner.commitTransaction();
      return await this.categoryRepository.findOneBy({ id: newCategory.id });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async addNewFormTemplate(addFormDto: AddFormTemplateDto) {
    const { categoryId, form } = addFormDto;
    try {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });

      if (!category)
        throw new BadRequestException(`Category of id ${categoryId} not found`);

      await this.setFormsFalse(category.formTemplates);

      const newTemplate = this.formTemplatesRepository.create({
        form,
        isActive: true,
        category,
      });

      return await this.formTemplatesRepository.save(newTemplate);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(dto: UpdateCategoryDto) {
    const { id, name, formTemplatesId } = dto;
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category)
      throw new BadRequestException(`Category of id ${id} not found`);

    if (name) await this.categoryRepository.update(id, { name });

    if (formTemplatesId) {
      await this.setFormsFalse(category.formTemplates);
      const form = await this.formTemplatesRepository.findOneBy({
        id: formTemplatesId,
      });

      form.isActive = true;
      await this.categoryRepository.save(category);
      await this.formTemplatesRepository.save(form);
    }

    return `Category updated successfully`;
  }

  private async setFormsFalse(forms: FormTemplate[]) {
    forms.forEach(async (el) => {
      el.isActive = false;
      await this.formTemplatesRepository.save(el);
    });
  }
}
