import { Injectable, NotFoundException } from '@nestjs/common';
import { Sindan } from './sindan.entity';
import { CreateSindanDto } from './dto/create-sindan.dto';
import { SindanRepository } from './sindan.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from 'src/tags/tags.repository';

@Injectable()
export class SindanService {
  constructor(
    @InjectRepository(SindanRepository)
    private sindanRepository: SindanRepository,
    private tagsRepository: TagsRepository,
  ) {}

  async getSindanById(id: string): Promise<Sindan> {
    const found = await this.sindanRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!found)
      throw new NotFoundException('指定したidのタスクが見つかりませんでした。');
    return found;
  }

  async createSindan(createSindanDto: CreateSindanDto): Promise<Sindan> {
    const { title, emoji, unit, author, description, height } = createSindanDto;

    let exists = await this.tagsRepository.findOne({ title: 'manaki' });

    if (!exists) {
      exists = this.tagsRepository.create({
        title: 'manaki',
      });
      await this.tagsRepository.save(exists);
    }

    const sindan = this.sindanRepository.create({
      title,
      emoji,
      unit,
      description,
      author,
      height,
      tags: [exists],
    });
    await this.sindanRepository.save(sindan);
    return sindan;
  }
}
