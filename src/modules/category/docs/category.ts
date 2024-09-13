import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

export function CreateCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a category' }),
    ApiResponse({ status: 200, description: 'Category created' }),
    ApiBody({ type: CreateCategoryDto }),
  );
}

export function GetCategories() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all categories' }),
    ApiResponse({ status: 200, description: 'Categories fetched' }),
  );
}

export function GetCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Get one category' }),
    ApiParam({ name: 'id', description: 'Category id', type: String }),
  );
}

export function UpdateCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'update a category' }),
    ApiBody({ type: UpdateCategoryDto }),
  );
}
