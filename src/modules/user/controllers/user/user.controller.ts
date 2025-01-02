import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CpfGuard } from '../../../../common/guards/cpf.guard';
import { ICreateUserRequestDto } from '../../dtos/user/create-user.request.dto';
import { UserResponseDto } from '../../dtos/user/user.response.dto';
import { ICreateUserService } from 'src/modules/user/services/user/create-user/create-user.service.interface';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AuthenticatedUserRequestDto } from 'src/common/core/dtos/auth.request.dto';
import { IGetAuthenticatedUserService } from '../../services/user/get-authenticated-user/get-authenticated-user.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
    @Inject('IGetAuthenticatedUserService')
    private readonly getAuthenticatedUserService: IGetAuthenticatedUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiBody({
    type: ICreateUserRequestDto,
    description: 'Dados de registro do usuário',
  })
  @UseGuards(CpfGuard)
  async create(
    @Body() userData: ICreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.createUserService.perform(userData);
  }

  @Get('')
  @ApiOperation({ summary: 'Obter dados do usuário autenticado' })
  @ApiResponse({
    status: 201,
    description: 'Dados do usuário autenticado retornados com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Erro de busca.' })
  @UseGuards(JwtAuthGuard)
  async logout(
    @Request() req: { user: AuthenticatedUserRequestDto },
  ): Promise<UserResponseDto> {
    return this.getAuthenticatedUserService.perform(req.user.token);
  }
}
