import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { IAuthService } from '../services/auth.interface';
import { faker } from '@faker-js/faker';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: IAuthService;

  const mockAuthService: Partial<IAuthService> = {
    login: jest
      .fn()
      .mockResolvedValue(faker.internet.jwt({ header: { alg: 'HS256' } })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'IAuthService',
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<IAuthService>('IAuthService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
