import { User } from "../domain/user.entity";

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract saveResetToken(id: string, tokenHash: string, expiresAt: Date): Promise<void>;
  abstract findByResetTokenHash(tokenHash: string): Promise<User | null>;
  abstract clearResetToken(userId: string): Promise<void>;
}