import { Inject, Injectable } from '@nestjs/common';
import { IGetRoleService } from './get-role.service.interface';
import { RoleTypes, Role } from 'src/database/entities/role.entity';
import { IRoleRepository } from 'src/modules/access-control/repositories/role/role.repository.interface';

@Injectable()
export class GetRoleService implements IGetRoleService {
  constructor(
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository,
  ) {}

  perform(name: RoleTypes): Promise<Role> {
    return this.roleRepository.findRoleByName(name);
  }
}
