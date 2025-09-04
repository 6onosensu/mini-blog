import { BadRequestException, Injectable } from "@nestjs/common";
import { createHash } from "crypto";
import { ChangePasswordUseCase } from "src/users/application/change-password.use-case";
import { UsersRepository } from "src/users/infrastructure/users.repository.interface";

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly users: UsersRepository,
    private readonly changePassword: ChangePasswordUseCase,
  ) {}

  async execute(token: string, newPlain: string): Promise<void> {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const user = await this.users.findByResetTokenHash(tokenHash);

    if (!user 
      || !user.resetTokenExpires 
      || user.resetTokenExpires < new Date()
    ) {
      throw new BadRequestException("Invalid or expired token");
    }

    await this.changePassword.execute(user.id, newPlain);
    await this.users.clearResetToken(user.id); 
  }
}