import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ICreateUserRequestDto } from '../../../dtos/user/create-user.request.dto';
import { IUserRepository } from '../../../repositories/user/user.repository.interface';
import { IUserResponseDto } from '../../../dtos/user/user.response.dto';
import { User } from 'src/database/entities/user.entity';
import { ICreateUserService } from './create-user.service.interface';
import { IPasswordService } from 'src/modules/password/services/password.interface';

@Injectable()
export class CreateUserService implements ICreateUserService {
  private _emailField: keyof User = 'email';
  private _cpfField: keyof User = 'cpf';

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
  ) {}

  async perform(userData: ICreateUserRequestDto): Promise<any> {
    await this.findUserByEmail(userData.email);
    await this.findUserByCpf(userData.cpf);
    userData.password = await this.passwordService.createHash(
      userData.password,
    );
    const createdUser = await this.userRepository.create(userData);
    return this.normalizeResponse(createdUser);
  }

  private async findUserByEmail(email: string) {
    const existingUserByEmail = await this.userRepository.findOneBy(
      this._emailField,
      email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('Usuário com este Email já existe');
    }
  }

  private async findUserByCpf(cpf: string) {
    const existingUserByCpf = await this.userRepository.findOneBy(
      this._cpfField,
      cpf,
    );
    if (existingUserByCpf) {
      throw new ConflictException('Usuário com este CPF já existe');
    }
  }

  private normalizeResponse(user: User): IUserResponseDto {
    return {
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      role: user.role,
      provider: user.provider,
      birthDate: user.birthDate,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
