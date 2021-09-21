import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionRepository } from './question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/users.repository';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [TypeOrmModule.forFeature([QuestionRepository, UserRepository]), AuthModule],
})
export class QuestionsModule {}
