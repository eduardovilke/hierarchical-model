import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDTO } from '../create-category.dto';
import { ACategoryService } from '../services/a-category.service';

@Controller('categories/adjacency')
export class ACategoryController {
  constructor(private readonly categoryService: ACategoryService) {}

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
}
