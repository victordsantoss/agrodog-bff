import { IBaseRepository } from 'src/common/core/repositories/base.repository.interface';
import { Role } from 'src/database/entities/role.entity';
import { CreateRoleRequestDto } from '../../dtos/role/create-role.request.dto';
import { UpdateRoleRequestDto } from '../../dtos/role/update-role.request.dto';

export interface IRoleRepository
  extends IBaseRepository<Role, CreateRoleRequestDto, UpdateRoleRequestDto> {
  findRoleByName(name: string): Promise<Role>;
}
