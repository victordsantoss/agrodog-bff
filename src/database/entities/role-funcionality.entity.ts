import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Role } from './role.entity';
import { Funcionality } from './functionality.entity';

@Entity({ name: 'tb_role_funcionality' })
export class RoleFuncionality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: 'Se está ativo ou não para a role-funcionalidade',
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

  @ManyToOne(() => Role, (role) => role.roleFuncionalities, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'id_role',
    referencedColumnName: 'id',
  })
  role: Role;

  @ManyToOne(
    () => Funcionality,
    (funcionality) => funcionality.roleFuncionalities,
    {
      eager: false,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'id_funcionality',
    referencedColumnName: 'id',
  })
  funcionality: Funcionality;
}
