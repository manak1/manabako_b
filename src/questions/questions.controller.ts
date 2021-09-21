import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('questions')
@UseGuards(AuthGuard())
export class QuestionsController {

  constructor(private questionService: QuestionsService) {}
  @Post()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto)
  }

  @Get('answered')
  getQuestionAnswered() {
    return this.questionService.getQuestionAnswered()
  }

  @Get('unanswered')
  getQuestionUnanswered() {
    return this.questionService.getQuestionUnanswered()
  }

  @Post(':id')
  answerQuestion(@Param('id') id: string, @Body('answer') answer: string) {
    return this.questionService.answerQuestion(id, answer)
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id)
  }

}
