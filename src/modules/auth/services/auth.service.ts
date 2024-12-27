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
import { Cache } from '@nestjs/cache-manager';
import { ISessionRepository } from '../repositories/session.repository.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ISessionRepository')
    private readonly sessionRepository: ISessionRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    private readonly jwtService: JwtService,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
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

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    await this.sessionRepository.create({
      user,
      token: token,
      startDate: new Date(),
    });
    return token;
  }

  public async logout(userId: string, token: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy('id', userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const tokenExpiration = this.jwtService.decode(token)['exp'];
    await this.cacheManager.set(
      `blacklist:${token}`,
      true,
      tokenExpiration - Math.floor(Date.now() / 1000),
    );

    // AQUI BUSCAR A SESSAO PELO TOKEN E ATUALIZAR O ENDDATE


    return true;
  }
}
