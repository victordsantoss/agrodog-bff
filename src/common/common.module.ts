import { Module } from '@nestjs/common';
import { CpfValidator } from './utils/cpf.utils';

@Module({
  providers: [CpfValidator],
  exports: [CpfValidator],
})
export class CommonModule {}
