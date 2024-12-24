import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { BaseRepository } from 'src/common/core/repositories/base.repository';
import { CreateUserRequestDto } from '../../dtos/user/create-user.request.dto';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  public async create(data: CreateUserRequestDto): Promise<User> {
    return super.create(data);
  }
}
