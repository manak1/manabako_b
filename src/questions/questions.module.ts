import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionRepository } from './question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/users.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository, UserRepository]), AuthModule, ConfigModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
