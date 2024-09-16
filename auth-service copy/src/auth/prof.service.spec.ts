import { Test, TestingModule } from '@nestjs/testing';
import { ProfService } from './prof.service';

describe('AuthService', () => {
  let service: ProfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfService],
    }).compile();

    service = module.get<ProfService>(ProfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
