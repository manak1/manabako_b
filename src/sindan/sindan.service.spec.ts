import { Test, TestingModule } from '@nestjs/testing';
import { SindanService } from './sindan.service';

describe('SindanService', () => {
  let service: SindanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SindanService],
    }).compile();

    service = module.get<SindanService>(SindanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
