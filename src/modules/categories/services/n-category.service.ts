import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from '../create-category.dto';
import { NCategory } from '../entities/n-category.entity';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class NCategoryService {
  constructor(
    @InjectRepository(NCategory)
    private readonly categoryRepository: Repository<NCategory>,
  ) {}

  create(data: CreateCategoryDTO) {
    const category = this.categoryRepository.create(data);
    if (data.parentId) {
      category.parent = { id: data.parentId } as NCategory;
    }

    return this.categoryRepository.save(category);
  }

  getById(id: string) {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  list() {
    return this.categoryRepository.find();
  }

  async getAncestorsById(id: string) {
    const entity = await this.getById(id);

    return this.categoryRepository.manager
      .getTreeRepository(NCategory)
      .findAncestorsTree(entity);
  }

  async getDescendantsById(id: string) {
    const entity = await this.getById(id);

    return this.categoryRepository.manager
      .getTreeRepository(NCategory)
      .findDescendantsTree(entity);
  }
}
