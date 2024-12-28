import { AuthenticatedUserRequestDto } from 'src/common/core/dtos/auth.request.dto';

export interface IAuthService {
  login(email: string, password: string): Promise<string>;
  logout(authenticatedUserData: AuthenticatedUserRequestDto): Promise<boolean>;
}
