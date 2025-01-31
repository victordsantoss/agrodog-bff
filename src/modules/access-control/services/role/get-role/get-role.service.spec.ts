import { Test, TestingModule } from '@nestjs/testing';
import { GetRoleService } from './get-role.service';

describe('GetRoleService', () => {
  let service: GetRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRoleService],
    }).compile();

    service = module.get<GetRoleService>(GetRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
