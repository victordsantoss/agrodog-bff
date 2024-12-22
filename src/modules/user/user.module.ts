import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserController } from './controllers/user/create-user/create-user.controller';
import { CreateUserService } from './services/user/create-user/create-user.service';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'agrodog')],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [TypeOrmModule],
})
export class UserModule { }
