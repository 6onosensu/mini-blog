import { Injectable } from "@nestjs/common";
import { User } from "../domain/user.entity";
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserValidatorService } from "./user-validator.service";
import { UsersRepository } from "../infrastructure/users.repository.interface";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userValidator: UserValidatorService,
    private readonly usersRepo: UsersRepository
  ) {}

  async execute(dto: CreateUserDto): Promise<void> {
    await this.userValidator.ensureEmailIsUnique(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = User.register(dto, hashedPassword);

    await this.usersRepo.save(user);
  }
}