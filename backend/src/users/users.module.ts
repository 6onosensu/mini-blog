import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepositoryTypeOrm } from './infrastructure/users.repository.typeorm';
import { UserValidatorService } from './application/user-validator.service';
import { UsersController } from './presentation/users.controller';
import { UserOrmEntity } from './infrastructure/entities/user.orm-entity';
import { ChangePasswordUseCase } from './application/change-password.use-case';
import { UsersRepository } from './infrastructure/users.repository.interface';
import { RegisterUserUseCase } from './application/register-user.use-case';


@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersRepositoryTypeOrm,
    },
    UserValidatorService,
    ChangePasswordUseCase,
    RegisterUserUseCase,
  ],
  exports: [
    UsersRepository, 
    UserValidatorService,
    ChangePasswordUseCase,
    RegisterUserUseCase,
  ],
})
export class UsersModule {}
