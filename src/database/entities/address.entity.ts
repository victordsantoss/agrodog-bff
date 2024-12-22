import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tb_address' })
export class Address {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'ID único do endereço (UUID)',
  })
  id: string;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome da rua ou logradouro',
  })
  street: string;

  @Column({
    name: 'number',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'Número do endereço',
  })
  number: string;

  @Column({
    name: 'complement',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Complemento do endereço (e.g., apto, bloco)',
  })
  complement: string;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Bairro',
  })
  neighborhood: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Cidade',
  })
  city: string;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 2,
    nullable: false,
    comment: 'Estado (UF)',
  })
  state: string;

  @Column({
    name: 'zip_code',
    type: 'varchar',
    length: 10,
    nullable: false,
    comment: 'CEP do endereço',
  })
  zipCode: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Data de criação do endereço',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Data de última atualização do endereço',
  })
  updatedAt: Date;

  /**
   * RELACIONAMENTOS
   */

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  user: User;
}
