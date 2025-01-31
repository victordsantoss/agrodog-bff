import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RoleFuncionality } from './role-funcionality.entity';
import { Resource } from './resource.entity';

export enum RoleTypes {
  SADMIN = 'SADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
  GUEST = 'GUEST',
}

@Entity({ name: 'tb_funcionality' })
export class Funcionality {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'ID único da funcionalidade (UUID)',
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome da funcionalidade',
  })
  name: string;

  @Column({
    name: 'url',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Url da funcionalidade',
  })
  url: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: 'Se o usuário está ativo ou inativo',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Data de criação do perfil',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Data de última atualização do perfil',
  })
  updatedAt: Date;

  /**
   * RELACIONAMENTOS
   */

  @OneToMany(
    () => RoleFuncionality,
    (roleFuncionality) => roleFuncionality.funcionality,
  )
  roleFuncionalities: RoleFuncionality[];

  @OneToMany(() => Resource, (resource) => resource.funcionality)
  resources: Resource[];
}
