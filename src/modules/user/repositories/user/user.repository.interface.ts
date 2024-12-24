import { IBaseRepository } from 'src/common/core/repositories/base.repository.interface';
import { User } from 'src/database/entities/user.entity';
import { CreateUserRequestDto } from '../../dtos/user/create-user.request.dto';

export interface IUserRepository
  extends IBaseRepository<User, CreateUserRequestDto> {}
