import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionality } from './functionality.entity';

@Entity({ name: 'tb_resource' })
export class Resource {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 150,
    nullable: false,
    comment: 'Nome do recurso/ação',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Descrição do recurso, se necessário',
  })
  description: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: 'Se o recurso está ativo ou não',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Data de criação do recurso',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Data de última atualização do recursoss',
  })
  updatedAt: Date;

  /**
   * RELACIONAMENTOS
   */

  @ManyToOne(() => Funcionality, (funcionality) => funcionality.resources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_funcionality',
    referencedColumnName: 'id',
  })
  funcionality: Funcionality;
}
