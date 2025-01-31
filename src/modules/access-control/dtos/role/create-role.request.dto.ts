import { ApiProperty } from '@nestjs/swagger';
import { RoleTypes } from 'src/database/entities/role.entity';

export class CreateRoleRequestDto {
  @ApiProperty({
    description: 'Nome do Perfil',
  })
  name: RoleTypes;
}
