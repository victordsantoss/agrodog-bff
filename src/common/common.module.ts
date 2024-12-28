import { Global, Module } from '@nestjs/common';
import { CpfValidator } from './core/utils/cpf.utils';
import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/database/entities/session.entity';

@Global()
@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Session], 'agrodog')],
  providers: [JwtAuthStrategy, JwtAuthGuard, CpfValidator],
  exports: [JwtAuthStrategy, JwtAuthGuard, CpfValidator],
})
export class CommonModule {}
