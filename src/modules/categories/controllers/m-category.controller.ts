import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDTO } from '../create-category.dto';
import { MCategoryService } from '../services/m-category.service';

@Controller('m-path')
export class MCategoryController {
  constructor(private readonly categoryService: MCategoryService) { }

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
