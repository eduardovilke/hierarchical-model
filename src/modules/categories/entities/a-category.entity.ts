import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
} from 'typeorm';

@Entity({ name: 'a_categories' })
@Tree('adjacency-list')
export class ACategory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ACategory, (category) => category.children)
  parent?: ACategory;

  @OneToMany(() => ACategory, (category) => category.parent)
  children?: ACategory[];
}
