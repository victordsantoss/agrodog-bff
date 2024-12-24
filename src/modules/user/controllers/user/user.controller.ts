import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Criar usuário',
  })
  async create(
    @Body() userData: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.createUserService.create(userData);
  }
}
