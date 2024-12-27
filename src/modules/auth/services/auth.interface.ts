export interface IAuthService {
  login(email: string, password: string): Promise<string>;
  logout(userId: string, token: string): Promise<boolean>;
}
