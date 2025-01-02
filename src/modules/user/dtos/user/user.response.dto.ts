export interface IUserResponseDto {
  name: string;
  email: string;
  cpf: string;
  role: string;
  provider: string | null;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
