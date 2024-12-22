import { User } from 'src/database/entities/user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
}
