import { Role, RoleTypes } from 'src/database/entities/role.entity';

export interface IGetRoleService {
  perform(name: RoleTypes): Promise<Role>;
}
