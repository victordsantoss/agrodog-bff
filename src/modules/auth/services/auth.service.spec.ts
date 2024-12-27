import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { IUserRepository } from 'src/modules/user/repositories/user/user.repository.interface';
import { IPasswordService } from 'src/modules/password/services/password.interface';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { User } from 'src/database/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: IUserRepository;
  let passwordService: IPasswordService;
  let jwtService: JwtService;

  const mockUser = {
    id: faker.string.numeric(11),
    email: faker.internet.email(),
    password: faker.string.alphanumeric(10),
    lastLogin: null,
  } as User;

  beforeEach(async () => {
    const mockUserRepository: Partial<IUserRepository> = {
      findOneBy: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(undefined),
    };

    const mockPasswordService: Partial<IPasswordService> = {
      validatePassword: jest.fn().mockResolvedValue(true),
    };

    const mockJwtService: Partial<JwtService> = {
      sign: jest.fn().mockReturnValue('mockJwtToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'IUserRepository', useValue: mockUserRepository },
        { provide: 'IPasswordService', useValue: mockPasswordService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<IUserRepository>('IUserRepository');
    passwordService = module.get<IPasswordService>('IPasswordService');
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);
      jest
        .spyOn(passwordService, 'validatePassword')
        .mockResolvedValueOnce(true);

      const token = await service.login(mockUser.email, mockUser.password);

      expect(userRepository.findOneBy).toHaveBeenCalledWith(
        'email',
        mockUser.email,
      );
      expect(passwordService.validatePassword).toHaveBeenCalledWith(
        mockUser.password,
        mockUser.password,
      );
      expect(userRepository.update).toHaveBeenCalledWith(
        mockUser.id,
        expect.objectContaining({ lastLogin: expect.any(Date) }),
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
      expect(token).toBe('mockJwtToken');
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(
        service.login(mockUser.email, mockUser.password),
      ).rejects.toThrow(NotFoundException);
      expect(userRepository.findOneBy).toHaveBeenCalledWith(
        'email',
        mockUser.email,
      );
    });

    it('should throw UnauthorizedException if the password is invalid', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);
      jest
        .spyOn(passwordService, 'validatePassword')
        .mockResolvedValueOnce(false);

      await expect(
        service.login(mockUser.email, mockUser.password),
      ).rejects.toThrow(UnauthorizedException);
      expect(passwordService.validatePassword).toHaveBeenCalledWith(
        mockUser.password,
        mockUser.password,
      );
    });

    it('should update the user lastLogin date on successful login', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);

      await service.login(mockUser.email, mockUser.password);

      expect(userRepository.update).toHaveBeenCalledWith(
        mockUser.id,
        expect.objectContaining({ lastLogin: expect.any(Date) }),
      );
    });
  });
});
