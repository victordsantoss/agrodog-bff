import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Phone } from './entities/phone.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Session } from './entities/session.entity';
import { Role } from './entities/role.entity';
import { Funcionality } from './entities/functionality.entity';
import { RoleFuncionality } from './entities/role-funcionality.entity';
import { Resource } from './entities/resource.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [
    User,
    Address,
    Phone,
    Session,
    Role,
    Funcionality,
    RoleFuncionality,
    Resource,
  ],
});

export default AppDataSource;

export const AgrodogForFeature: EntityClassOrSchema[] = [
  User,
  Address,
  Phone,
  Session,
  Role,
  Funcionality,
  RoleFuncionality,
  Resource,
];
