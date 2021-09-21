import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/users.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {

  constructor(@InjectRepository(QuestionRepository)
  private questionRepository: QuestionRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async getQuestionAnswered(): Promise<Question[]> {
    const questions = await this.questionRepository.find({ where: { answered: true } })
    return questions
  }

  async getQuestionUnanswered(): Promise<Question[]> {
    const questions = await this.questionRepository.find({ where: { answered: false } })
    return questions
  }

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const { message } = createQuestionDto
    const user = await this.userRepository.findOne({ username: 'manaki' }, { relations: ['questions'] })
    const question: Question = this.questionRepository.create({
      answered: false,
      answer: '',
      message
    })

    await this.questionRepository.save(question)
    user.questions.push(question)
    await this.userRepository.save(user)
    return question
  }


  async answerQuestion(id: string, answer: string) {
    const target = await this.questionRepository.findOne(id)
    if (!target) throw new NotFoundException('指定したidの質問が見つかりませんでした。')
    target.answer = answer
    target.answered = true
    this.questionRepository.save(target)
    return target
  }

  async getQuestionById(id: string) {
    const target = await this.questionRepository.findOne(id)
    if (!target) throw new NotFoundException('指定したidの質問が見つかりませんでした。')
    return target
  }
}
