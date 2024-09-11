import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  AddFormTemplateDto,
  type UpdateCategoryDto,
} from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('form-template')
  createFormTemplate(@Body() addTemplateDto: AddFormTemplateDto) {
    return this.categoryService.addNewFormTemplate(addTemplateDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch()
  update(@Body() updateDto: UpdateCategoryDto) {
    return this.categoryService.update(updateDto);
  }
}
