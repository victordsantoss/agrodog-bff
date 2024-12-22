import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './data-source';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      name: 'agrodog',
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
