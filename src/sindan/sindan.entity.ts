import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../tags/tag.entity';

@Entity()
export class Sindan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  height: number;

  @Column()
  unit: string;

  @Column()
  emoji: string;

  @Column()
  author: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
