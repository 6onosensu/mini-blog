import { Module } from '@nestjs/common';
import { UsersRepositoryTypeOrm } from './infrastructure/users.repository.typeorm';

@Module({
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryTypeOrm,
    }
  ],
  exports: ['UsersRepository'],
})
export class UsersModule {}
