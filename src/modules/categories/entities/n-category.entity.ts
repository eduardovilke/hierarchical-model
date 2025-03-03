import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'n_categories' })
@Tree('nested-set')
export class NCategory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @TreeChildren()
  children: NCategory[];

  @TreeParent()
  parent: NCategory;
}
