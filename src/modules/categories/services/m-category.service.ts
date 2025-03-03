import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MCategory } from '../entities/m-category.entity';
import { CreateCategoryDTO } from '../create-category.dto';

@Injectable()
export class MCategoryService {
  constructor(
    @InjectRepository(MCategory)
    private readonly categoryRepository: Repository<MCategory>,
  ) {}

  create(data: CreateCategoryDTO) {
    const category = this.categoryRepository.create(data);
    if (data.parentId) {
      category.parent = { id: data.parentId } as MCategory;
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
      .getTreeRepository(MCategory)
      .findAncestorsTree(entity);
  }

  async getDescendantsById(id: string) {
    const entity = await this.getById(id);

    return this.categoryRepository.manager
      .getTreeRepository(MCategory)
      .findDescendantsTree(entity);
  }
}
