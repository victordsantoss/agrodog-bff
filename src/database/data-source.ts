import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'agrodog',
  synchronize: true,
  logging: false,
  entities: [User],
});

export default AppDataSource;
