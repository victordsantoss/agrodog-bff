import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './controllers/user/user.controller';
import { CreateUserService } from './services/user/create-user/create-user.service';
import { UserRepository } from './repositories/user/user.repository';
import { CommonModule } from 'src/common/common.module';
import { PasswordModule } from '../password/password.module';
import { AuthModule } from '../auth/auth.module';
import { GetAuthenticatedUserService } from './services/user/get-authenticated-user/get-authenticated-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'agrodog'),
    CommonModule,
    PasswordModule,
    forwardRef(() => AuthModule),
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
    {
      provide: 'IGetAuthenticatedUserService',
      useClass: GetAuthenticatedUserService,
    },
  ],
  exports: [
    'ICreateUserService',
    'IUserRepository',
    'IGetAuthenticatedUserService',
    TypeOrmModule,
  ],
})
export class UserModule {}
