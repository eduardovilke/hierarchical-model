import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'm_categories' })
@Tree('materialized-path')
export class MCategory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @TreeChildren()
  children: MCategory[];

  @TreeParent()
  parent: MCategory;
}
