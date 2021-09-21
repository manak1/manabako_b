import { EntityRepository, Repository } from 'typeorm';
import { Sindan } from './sindan.entity';

@EntityRepository(Sindan)
export class SindanRepository extends Repository<Sindan> {}
