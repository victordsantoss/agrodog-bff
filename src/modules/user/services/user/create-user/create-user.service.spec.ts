import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { IUserRepository } from 'src/modules/user/repositories/user/user.repository.interface';
import { IPasswordService } from 'src/modules/password/services/password.interface';
import { ConflictException } from '@nestjs/common';
import { ICreateUserRequestDto } from '../../../dtos/user/create-user.request.dto';
import { IUserResponseDto } from '../../../dtos/user/user.response.dto';
import { User } from 'src/database/entities/user.entity';
import { faker } from '@faker-js/faker/.';
describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: IUserRepository;
  let passwordService: IPasswordService;

  const mockUserResponse = {
    id: faker.string.numeric(11),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.string.numeric(11),
    password: 'hashedPassword',
    role: 'USER',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  } as User;

  const mockUserRequest = {
    name: mockUserResponse.name,
    email: mockUserResponse.email,
    password: mockUserResponse.password,
    cpf: mockUserResponse.cpf,
  } as ICreateUserRequestDto;

  beforeEach(async () => {
    const mockUserRepository: Partial<IUserRepository> = {
      findOneBy: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(mockUserResponse),
    };

    const mockPasswordService: Partial<IPasswordService> = {
      createHash: jest.fn().mockResolvedValue('hashedPassword'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: 'IUserRepository', useValue: mockUserRepository },
        { provide: 'IPasswordService', useValue: mockPasswordService },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<IUserRepository>('IUserRepository');
    passwordService = module.get<IPasswordService>('IPasswordService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('perform', () => {
    it('should create a user successfully', async () => {
      const result = await service.perform(mockUserRequest);

      expect(userRepository.findOneBy).toHaveBeenCalledWith(
        'email',
        mockUserRequest.email,
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith(
        'cpf',
        mockUserRequest.cpf,
      );
      expect(passwordService.createHash).toHaveBeenCalledWith(
        mockUserRequest.password,
      );
      expect(userRepository.create).toHaveBeenCalledWith({
        ...mockUserRequest,
        password: 'hashedPassword',
      });
      expect(result).toEqual({
        id: mockUserResponse.id,
        name: mockUserResponse.name,
        email: mockUserResponse.email,
        role: mockUserResponse.role,
        createdAt: mockUserResponse.createdAt,
        updatedAt: mockUserResponse.updatedAt,
      } as IUserResponseDto);
    });

    it('should throw ConflictException if email already exists', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockImplementationOnce(async () => mockUserResponse);

      await expect(service.perform(mockUserRequest)).rejects.toThrow(
        ConflictException,
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith(
        'email',
        mockUserRequest.email,
      );
    });

    it('should throw ConflictException if CPF already exists', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockImplementationOnce(async () => null);
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockImplementationOnce(async () => mockUserResponse);

      await expect(service.perform(mockUserRequest)).rejects.toThrow(
        ConflictException,
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith(
        'cpf',
        mockUserRequest.cpf,
      );
    });
  });

  describe('normalizeResponse', () => {
    it('should normalize user entity to response DTO', () => {
      const result = service['normalizeResponse'](mockUserResponse);
      expect(result).toEqual({
        id: mockUserResponse.id,
        name: mockUserResponse.name,
        email: mockUserResponse.email,
        role: mockUserResponse.role,
        createdAt: mockUserResponse.createdAt,
        updatedAt: mockUserResponse.updatedAt,
      } as IUserResponseDto);
    });
  });
});
