import { IBaseRepository } from 'src/common/core/repositories/base.repository.interface';
import { Session } from 'src/database/entities/session.entity';
import { CreateSessionRequestDto } from '../dtos/session/create-session.request.dto';
import { UpdateSessionRequestDto } from '../dtos/session/update-session.request.dto';
import { IGetAuthenticatedUserResponseDto } from 'src/modules/user/dtos/user/get-authenticated-user.response.dto';

export interface ISessionRepository
  extends IBaseRepository<
    Session,
    CreateSessionRequestDto,
    UpdateSessionRequestDto
  > {
  findActiveSessionsByUserId(userId: string): Promise<Session[]>;
  findActiveUserByToken(
    token: string,
  ): Promise<IGetAuthenticatedUserResponseDto>;
}
