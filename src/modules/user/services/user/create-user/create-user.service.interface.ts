import { User } from 'src/database/entities/user.entity';
import { UserResponseDto } from 'src/modules/user/dtos/user/user.response.dto';

export interface ICreateUserService {
  create(user: Partial<User>): Promise<UserResponseDto>;
}
