import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ACategory } from '../entities/a-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ACategoryService {
  constructor(
    @InjectRepository(ACategory)
    private readonly categoryRepository: Repository<ACategory>,
  ) {}

  create(data: any) {
    return this.categoryRepository.save(this.categoryRepository.create(data));
  }

  getById(id: string) {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  list() {
    return this.categoryRepository.find();
  }
}
