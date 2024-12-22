import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../../dtos/create-user.request.dto';
import { IUserRepository } from '../../repositories/user.repository.interface';
import { UserResponseDto } from '../../dtos/user.response.dto';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class CreateUserService {
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
