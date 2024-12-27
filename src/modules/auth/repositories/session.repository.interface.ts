import { IBaseRepository } from 'src/common/core/repositories/base.repository.interface';
import { Session } from 'src/database/entities/session.entity';
import { CreateSessionRequestDto } from '../dtos/session/create-session.request.dto';
import { UpdateSessionRequestDto } from '../dtos/session/update-session.request.dto';

export interface ISessionRepository
  extends IBaseRepository<
    Session,
    CreateSessionRequestDto,
    UpdateSessionRequestDto
  > { }
