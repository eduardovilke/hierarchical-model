import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ACategory } from '../entities/a-category.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDTO } from '../create-category.dto';

@Injectable()
export class ACategoryService {
  constructor(
    @InjectRepository(ACategory)
    private readonly categoryRepository: Repository<ACategory>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

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

  getDescendantsById(id: string) {
    return this.dataSource.query(
      `
      WITH RECURSIVE category_tree AS (
        SELECT id, name, parent_id
        FROM a_categories
        WHERE id = $1

        UNION ALL

        SELECT c.id, c.name, c.parent_id
        FROM a_categories c
        INNER JOIN category_tree ct ON c.parent_id = ct.id
      )
      SELECT * FROM category_tree
      `,
      [id],
    );
  }

  getAncestorsById(id: string) {
    return this.dataSource.query(
      `
      WITH RECURSIVE category_ancestors AS (
        SELECT id, name, parent_id
        FROM a_categories
        WHERE id = $1

        UNION ALL

        SELECT c.id, c.name, c.parent_id
        FROM a_categories c
        INNER JOIN category_ancestors ca ON c.id = ca.parent_id
        )
      SELECT * FROM category_ancestors
      `,
      [id],
    );
  }
}
