import { Test, TestingModule } from '@nestjs/testing';
import { SindanController } from './sindan.controller';

describe('SindanController', () => {
  let controller: SindanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SindanController],
    }).compile();

    controller = module.get<SindanController>(SindanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
