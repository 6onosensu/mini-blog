import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../infrastructure/users.repository.interface";
import { UserValidatorService } from "./user-validator.service";
import { hashSync } from "bcrypt";


@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly users: UsersRepository,
    private readonly validator: UserValidatorService
  ) {}

  async execute(
    userId: string, 
    newPlain: string, 
    currentPlain?: string
  ): Promise<void> {
    const user = await this.validator.getActiveUserById(userId);

    if (currentPlain && currentPlain.trim()) {
      user.changePassword(currentPlain, newPlain);
    } else {
      user.setPassword(newPlain);
    }

    await this.users.save(user);
  }
}