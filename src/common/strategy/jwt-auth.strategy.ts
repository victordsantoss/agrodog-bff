import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from 'src/database/entities/session.entity';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(
    @InjectRepository(Session, 'agrodog')
    private readonly sessionRepository: Repository<Session>,
  ) {
    super();
  }

  authenticate(req: Request): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token inválido');
    }

    this.sessionRepository
      .findOne({ where: { token }, relations: { user: true } })
      .then((session) => {
        if (!session) {
          return this.fail(new UnauthorizedException(), 401);
        }

        return this.success({ userId: session.user.id, token });
      })
      .catch(() => {
        throw new NotFoundException('Usuário não encontrado');
      });
  }
}
