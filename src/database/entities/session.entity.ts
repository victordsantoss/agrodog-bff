import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tb_session' })
export class Session {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'ID único da sessão (UUID)',
  })
  id: string;

  @Column({
    name: 'token',
    type: 'varchar',
    length: 500,
    nullable: false,
    comment: 'Token da sessão',
  })
  token: string;

  @Column({
    name: 'start_date',
    type: 'timestamp',
    nullable: false,
    comment: 'Data e hora de início da sessão',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamp',
    nullable: true,
    comment: 'Data e hora de término da sessão',
  })
  endDate: Date;

  /**
   * RELACIONAMENTO
   */

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  user: User;
}