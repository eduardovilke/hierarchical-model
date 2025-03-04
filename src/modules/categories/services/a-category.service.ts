import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ACategory } from '../entities/a-category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from '../create-category.dto';

@Injectable()
export class ACategoryService {
  constructor(
    @InjectRepository(ACategory)
    private readonly categoryRepository: Repository<ACategory>,
  ) { }

  create(data: CreateCategoryDTO) {
    const category = this.categoryRepository.create(data);
    if (data.parentId) {
      category.parent = { id: data.parentId } as ACategory;
    }

    return this.categoryRepository.save(category);
  }

  getById(id: string) {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  list() {
    return this.categoryRepository.find();
  }
}
