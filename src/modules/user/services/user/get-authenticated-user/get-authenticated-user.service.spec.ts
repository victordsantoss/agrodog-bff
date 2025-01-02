import { Test, TestingModule } from '@nestjs/testing';
import { GetAuthenticatedUserService } from './get-authenticated-user.service';

describe('GetAuthenticatedUserService', () => {
  let service: GetAuthenticatedUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAuthenticatedUserService],
    }).compile();

    service = module.get<GetAuthenticatedUserService>(
      GetAuthenticatedUserService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
