import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './controllers/user/user.controller';
import { CreateUserService } from './services/user/create-user/create-user.service';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'agrodog')],
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
  exports: ['ICreateUserService', TypeOrmModule],
})
export class UserModule {}
