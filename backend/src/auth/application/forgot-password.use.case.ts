import { Injectable } from "@nestjs/common";
import { createHash, randomBytes } from "crypto";
import { MailerService } from "@nestjs-modules/mailer";
import { UserValidatorService } from "src/users/application/user-validator.service";
import { UsersRepository } from "src/users/infrastructure/users.repository.interface";

@Injectable()
export class ForgotPasswordUseCase {
  constructor (
    private readonly userValidator: UserValidatorService,
    private readonly mailer: MailerService,
    private readonly userRepo: UsersRepository,
  ) {}

  async execute(email: string): Promise<void> {
    let userId: string | null = null;
    try {
      const user = await this.userValidator.getActiveUserByEmail(email);
      userId = user.id;
    } catch {
      return;
    }

    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    
    await this.userRepo.saveResetToken(userId!, tokenHash, expiresAt);
    
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailer.sendMail({
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });
  }
}