import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'tb_phone' })
export class Phone {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'ID único do telefone (UUID)',
  })
  id: string;

  @Column({
    name: 'number',
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: 'Número de telefone (com DDD e DDI, se necessário)',
  })
  number: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ['MOBILE', 'HOME', 'WORK', 'OTHER'],
    default: 'MOBILE',
    comment: 'Tipo de telefone (e.g., MOBILE, HOME, WORK, OTHER)',
  })
  type: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Data de criação do telefone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Data de última atualização do telefone',
  })
  updatedAt: Date;

  /**
   * RELACIONAMENTOS
   */
  @ManyToOne(() => User, (user) => user.phones, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id',
  })
  user: User;
}
