import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRequestDto } from '../dtos/auth.request.dto';
import { IAuthService } from '../services/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário autenticado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de autenticação.' })
  @ApiBody({
    type: AuthRequestDto,
    description: 'Dados de autenticação do usuário',
  })
  async login(@Body() loginData: AuthRequestDto): Promise<string> {
    return await this.authService.login(loginData.email, loginData.password);
  }
}
