import { IUserResponseDto } from 'src/modules/user/dtos/user/user.response.dto';

export interface IGetAuthenticatedUserService {
  perform(token: string): Promise<IUserResponseDto>;
}
