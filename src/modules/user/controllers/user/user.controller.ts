import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CpfGuard } from 'src/common/guards/cpf.guard';
import { CreateUserRequestDto } from 'src/modules/user/dtos/user/create-user.request.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user/user.response.dto';
import { ICreateUserService } from 'src/modules/user/services/user/create-user/create-user.service.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiBody({
    type: CreateUserRequestDto,
    description: 'Dados de registro do usuário',
  })
  @UseGuards(CpfGuard)
  async create(
    @Body() userData: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.createUserService.perform(userData);
  }
}
