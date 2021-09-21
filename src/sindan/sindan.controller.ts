import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSindanDto } from './dto/create-sindan.dto';
import { Sindan } from './sindan.entity';
import { SindanService } from './sindan.service';

@Controller('sindans')
export class SindanController {
  constructor(private readonly sindanService: SindanService) {}
  @Get('/:id')
  getSindanById(@Param('id') id: string): Promise<Sindan> {
    return this.sindanService.getSindanById(id);
  }

  @Post()
  createSindan(@Body() createSindanDto: CreateSindanDto): Promise<Sindan> {
    return this.sindanService.createSindan(createSindanDto);
  }
}
