import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from '../create-category.dto';
import { NCategory } from '../entities/n-category.entity';
import { CCategory } from '../entities/c-category.entity';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class CCategoryService {
  constructor(
    @InjectRepository(CCategory)
    private readonly categoryRepository: Repository<CCategory>,
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

    // .findAncestorsTree(entity, { depth: 2 });

    return this.categoryRepository.manager
      .getTreeRepository(CCategory)
      .findAncestorsTree(entity);
  }

  async getDescendantsById(id: string) {
    const entity = await this.getById(id);

    return this.categoryRepository.manager
      .getTreeRepository(CCategory)
      .findDescendantsTree(entity);
  }
}
