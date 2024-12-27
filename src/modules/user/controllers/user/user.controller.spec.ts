import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CanActivate } from '@nestjs/common';
import { CpfGuard } from 'src/common/guards/cpf.guard';
import { ICreateUserService } from '../../services/user/create-user/create-user.service.interface';
import { faker } from '@faker-js/faker';

describe('UserController', () => {
  let controller: UserController;
  let createUserService: ICreateUserService;

  const defaultUserResponseData = {
    id: faker.string.numeric(11),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.string.numeric(11),
  };

  beforeEach(async () => {
    class CpfGuardMock implements CanActivate {
      canActivate(): boolean {
        return true;
      }
    }

    const mockCreateUserService: Partial<ICreateUserService> = {
      perform: jest.fn().mockResolvedValue(defaultUserResponseData),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'ICreateUserService',
          useValue: mockCreateUserService,
        },
      ],
    })
      .overrideGuard(CpfGuard)
      .useValue(new CpfGuardMock())
      .compile();

    controller = module.get<UserController>(UserController);
    createUserService = module.get<ICreateUserService>('ICreateUserService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreateUserService', () => {
    it('should call perform with correct parameters and return a user response', async () => {
      const userData = {
        name: defaultUserResponseData.name,
        email: defaultUserResponseData.email,
        password: faker.string.alphanumeric(10),
        cpf: defaultUserResponseData.cpf,
      };

      const result = await createUserService.perform(userData);

      expect(createUserService.perform).toHaveBeenCalledWith(userData);
      expect(result).toEqual(
        expect.objectContaining({
          id: defaultUserResponseData.id,
          name: userData.name,
          email: userData.email,
          cpf: userData.cpf,
        }),
      );
    });

    it('should throw an error if perform fails', async () => {
      jest
        .spyOn(createUserService, 'perform')
        .mockRejectedValueOnce(new Error('Service error'));

      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        cpf: faker.string.numeric(11),
      };

      await expect(createUserService.perform(userData)).rejects.toThrow(
        'Service error',
      );
    });
  });
});
