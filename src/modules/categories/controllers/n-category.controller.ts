import { Controller } from '@nestjs/common/decorators/core';
import { CreateCategoryDTO } from '../create-category.dto';
import { NCategoryService } from '../services/n-category.service';
import { Body, Get, Param, Post } from '@nestjs/common/decorators/http';

@Controller('nested-set')
export class NCategoryController {
  constructor(private readonly categoryService: NCategoryService) {}

  @Post()
  create(@Body() data: CreateCategoryDTO) {
    return this.categoryService.create(data);
  }

  @Get()
  list() {
    return this.categoryService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @Get('tree/:id/ancestors')
  getAncestorsById(@Param('id') id: string) {
    return this.categoryService.getAncestorsById(id);
  }

  @Get('tree/:id/descendants')
  getDescendantsById(@Param('id') id: string) {
    return this.categoryService.getDescendantsById(id);
  }
}
