import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/core/repositories/base.repository';
import { ISessionRepository } from './session.repository.interface';
import { Session } from 'src/database/entities/session.entity';

@Injectable()
export class SessionRepository
  extends BaseRepository<Session>
  implements ISessionRepository {
  constructor(dataSource: DataSource) {
    super(dataSource, Session);
  }

  public async findActiveSessions(userId: string): Promise<Session[]> {
    return this.repository.find({
      where: {
        user: { id: userId },
        endDate: null,
        isActive: true,
      },
      relations: ['user'],
    });
  }
}
