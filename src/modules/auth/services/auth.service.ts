import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { IUserRepository } from 'src/modules/user/repositories/user/user.repository.interface';
import { IPasswordService } from 'src/modules/password/services/password.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    private readonly jwtService: JwtService,
  ) { }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy('email', email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    user.lastLogin = new Date();
    await this.userRepository.update(user.id, user);

    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
