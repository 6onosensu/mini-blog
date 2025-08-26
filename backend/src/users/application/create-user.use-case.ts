import { ConflictException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../infrastructure/users.repository.interface";
import { User } from "../domain/user.entity";
import { UserStatus } from "../domain/user-status.enum";
import { UserRole } from "../domain/user-role.enum";
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository
  ) {}

  async execute(dto: CreateUserDto): Promise<void> {
    const existingUser = await this.usersRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User(
      uuidv4(),
      dto.email.toLowerCase(),
      hashedPassword,
      dto.firstName,
      dto.lastName,
      dto.avatarUrl ?? '',
      dto.socialLinks ?? {},
      UserRole.Guest,
      UserStatus.Pending,
      new Date().toISOString(),
      new Date().toISOString(),
    );

    await this.usersRepo.save(user);
  }
}