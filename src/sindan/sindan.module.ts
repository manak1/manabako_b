import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepository } from 'src/tags/tags.repository';
import { SindanController } from './sindan.controller';
import { SindanRepository } from './sindan.repository';
import { SindanService } from './sindan.service';

@Module({
  controllers: [SindanController],
  providers: [SindanService],
  imports: [TypeOrmModule.forFeature([SindanRepository, TagsRepository])],
})
export class SindanModule {}
