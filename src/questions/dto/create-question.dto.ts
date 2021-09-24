import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @MinLength(5, { message: '質問は5文字以上で入力してね。' })
  @MaxLength(300, { message: '質問は300文字以下で入力してね。' })
  message: string
}
