import { Module } from '@nestjs/common';
import { UsersRepositoryTypeOrm } from './infrastructure/users.repository.typeorm';
import { UserValidatorService } from './application/user-validator.service';

@Module({
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryTypeOrm,
    },
    UserValidatorService,
  ],
  exports: [
    'UsersRepository', 
    UserValidatorService
  ],
})
export class UsersModule {}
