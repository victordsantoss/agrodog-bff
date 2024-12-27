import { Injectable } from '@nestjs/common';
import { DataSource, UpdateResult } from 'typeorm';
import { BaseRepository } from 'src/common/core/repositories/base.repository';
import { ISessionRepository } from './session.repository.interface';
import { Session } from 'src/database/entities/session.entity';
import { CreateSessionRequestDto } from '../dtos/session/create-session.request.dto';
import { UpdateSessionRequestDto } from '../dtos/session/update-session.request.dto';

@Injectable()
export class SessionRepository
  extends BaseRepository<Session>
  implements ISessionRepository {
  constructor(dataSource: DataSource) {
    super(dataSource, Session);
  }

  public async create(data: CreateSessionRequestDto): Promise<Session> {
    return super.create(data);
  }

  public async update(
    id: string,
    data: UpdateSessionRequestDto,
  ): Promise<UpdateResult> {
    return super.update(id, data);
  }
}
