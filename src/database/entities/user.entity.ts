import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Phone } from './phone.entity';

@Entity({ name: 'tb_user' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'ID único do usuário (UUID)',
  })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome do usuário',
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome da ação',
  })
  email: string;

  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 14,
    nullable: false,
    unique: true,
    comment: 'CPF do usuário (apenas números)',
  })
  cpf: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Senha criptografada do usuário',
  })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    comment: 'Papel do usuário no sistema',
  })
  role: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: 'Se o usuário está ativo ou inativo',
  })
  isActive: boolean;

  @Column({
    name: 'provider',
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Provedor de autenticação (e.g., local, Google, Facebook)',
  })
  provider: string;

  @Column({
    name: 'last_login',
    type: 'timestamp',
    nullable: true,
    comment: 'Última data de login do usuário',
  })
  lastLogin: Date;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
    comment: 'Data de nascimento do usuário',
  })
  birthDate: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Data de criação do usuário',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Data de última atualização do usuário',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    comment: 'Data de deleção lógica do usuário',
  })
  deletedAt: Date;

  /**
   * RELACIONAMENTOS
   */
  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
  phones: Address[];
}
