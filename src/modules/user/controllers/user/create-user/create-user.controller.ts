import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/modules/user/dtos/user/create-user.request.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user/user.response.dto';
import { CreateUserService } from 'src/modules/user/services/user/create-user/create-user.service';

@Controller('create-user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) { }

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
