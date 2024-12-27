import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(private readonly jwtService: JwtService) {
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

    // try {
    //   const payload = this.jwtService.verify(token);
    //   req.user = payload;
    //   this.success(req.user, null);
    // } catch (err) {
    //   throw new UnauthorizedException('Token inválido ou expirado');
    // }
  }
}
