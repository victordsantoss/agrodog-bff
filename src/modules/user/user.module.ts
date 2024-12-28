import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './controllers/user/user.controller';
import { CreateUserService } from './services/user/create-user/create-user.service';
import { UserRepository } from './repositories/user/user.repository';
import { CommonModule } from 'src/common/common.module';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'agrodog'),
    CommonModule,
    PasswordModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'ICreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['ICreateUserService', 'IUserRepository', TypeOrmModule],
})
export class UserModule {}
