import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../../../dtos/user/create-user.request.dto';
import { IUserRepository } from '../../../repositories/user/user.repository.interface';
import { UserResponseDto } from '../../../dtos/user/user.response.dto';
import { User } from 'src/database/entities/user.entity';
import { ICreateUserService } from './create-user.service.interface';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(userData: CreateUserRequestDto): Promise<UserResponseDto> {
    const createdUser = await this.userRepository.create(userData);
    return this.normalizeResponse(createdUser);
  }

  private normalizeResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
