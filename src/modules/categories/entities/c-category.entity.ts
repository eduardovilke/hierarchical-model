import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'c_categories' })
@Tree('closure-table')
export class CCategory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @TreeChildren()
  children: CCategory[];

  @TreeParent()
  parent: CCategory;
}
