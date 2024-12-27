import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './controllers/user/user.controller';
import { CreateUserService } from './services/user/create-user/create-user.service';
import { UserRepository } from './repositories/user/user.repository';
import { CpfGuard } from 'src/common/guards/cpf.guard';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'agrodog'), CommonModule],
  controllers: [UserController],
  providers: [
    CpfGuard,
    {
      provide: 'ICreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['ICreateUserService', TypeOrmModule],
})
export class UserModule {}
