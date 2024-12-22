import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserRequestDto } from '../../dtos/user/create-user.request.dto';
import { IUserRepository } from './user.repository.interface';


@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User, 'agrodog')
    private readonly repository: Repository<User>,
  ) { }

  async create(user: CreateUserRequestDto): Promise<User> {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }
}
