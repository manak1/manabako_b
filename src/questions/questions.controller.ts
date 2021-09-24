import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('questions')
export class QuestionsController {

  constructor(private questionService: QuestionsService, private configService: ConfigService) {}
  @Post()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto)
  }

  @Get('answered')
  getQuestionAnswered() {
    return this.questionService.getQuestionAnswered()
  }

  @Get('unanswered')
  @UseGuards(AuthGuard())
  getQuestionUnanswered() {
    return this.questionService.getQuestionUnanswered()
  }

  @Post(':id')
  @UseGuards(AuthGuard())
  answerQuestion(@Param('id') id: string, @Body('answer') answer: string) {
    return this.questionService.answerQuestion(id, answer)
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id)
  }


  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteQuestionById(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id)
  }

}
