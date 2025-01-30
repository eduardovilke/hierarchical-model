import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  create(data: any) {
    return this.categoryRepository.save(
      this.categoryRepository.create((data))
    )
  }
}
