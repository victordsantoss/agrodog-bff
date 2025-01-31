import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/common/core/repositories/base.repository';
import { ISessionRepository } from './session.repository.interface';
import { Session } from 'src/database/entities/session.entity';
import { IGetAuthenticatedUserResponseDto } from 'src/modules/user/dtos/user/get-authenticated-user.response.dto';

@Injectable()
export class SessionRepository
  extends BaseRepository<Session>
  implements ISessionRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, Session);
  }

  public async findActiveSessionsByUserId(userId: string): Promise<Session[]> {
    return this.repository.find({
      where: {
        user: { id: userId },
        endDate: null,
        isActive: true,
      },
      relations: ['user'],
    });
  }

  public async findActiveUserByToken(
    token: string,
  ): Promise<IGetAuthenticatedUserResponseDto> {
    return this.repository.findOne({
      where: {
        token: token,
        endDate: null,
        isActive: true,
      },
      relations: ['user'],
      select: {
        user: {
          name: true,
          email: true,
          cpf: true,
          // role: true,
          provider: true,
          birthDate: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }
}
