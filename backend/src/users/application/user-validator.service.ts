import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../infrastructure/users.repository.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class UserValidatorService {
  constructor(
    private readonly usersRepo: UsersRepository
  ) {}

  async getActiveUserById(id: string): Promise<User> {
    const user = await this.usersRepo.findById(id);
    this.ensureUserIsValid(user);
    return user!;
  }

  async getActiveUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findByEmail(email.toLowerCase());
    this.ensureUserIsValid(user);
    return user!;
  }

  async ensureEmailIsUnique(email: string): Promise<void> {
    const user = await this.usersRepo.findByEmail(email.toLowerCase());
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
  }

  ensureUserIsValid(user: User | null): void {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isBlocked) {
      throw new UnauthorizedException('User is blocked');
    }
  }
}
