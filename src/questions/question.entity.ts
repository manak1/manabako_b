import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  answer: string

  @Column()
  answered: boolean

  @ManyToOne(() => User, user => user.questions)
  user: User
}
