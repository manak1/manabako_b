import { IsNotEmpty } from 'class-validator';

export class CreateSindanDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  emoji: string;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  unit: string;
}
