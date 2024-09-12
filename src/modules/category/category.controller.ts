import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  AddFormTemplateDto,
  type UpdateCategoryDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCategory,
  GetCategories,
  GetCategory,
  UpdateCategory,
} from './docs/category';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @CreateCategory()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('form-template')
  createFormTemplate(@Body() addTemplateDto: AddFormTemplateDto) {
    return this.categoryService.addNewFormTemplate(addTemplateDto);
  }

  @GetCategories()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @GetCategory()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @UpdateCategory()
  @Patch()
  update(@Body() updateDto: UpdateCategoryDto) {
    return this.categoryService.update(updateDto);
  }
}
