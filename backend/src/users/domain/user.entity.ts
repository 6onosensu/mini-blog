import { UserRole } from "./user-role.enum";
import { UserStatus } from "./user-status.enum";
import { compareSync, hashSync } from 'bcrypt';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public firstName: string,
    public lastName: string,
    public avatarUrl: string,
    public socialLinks: Record<string, string>,
    public role: UserRole,
    public status: UserStatus = UserStatus.Pending,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  activate(): void {
    if (this.status === UserStatus.Blocked) {
      throw new Error('Blocked users cannot be activated')
    }
    this.status = UserStatus.Active;
  }

  block(): void {
    this.status = UserStatus.Blocked;
  }

  isActive(): boolean {
    return this.status === UserStatus.Active;
  }

  isBlocked(): boolean {
    return this.status === UserStatus.Blocked;
  }

  changeName(firstName: string, lastName: string): void {
    this.firstName = firstName;
    this.lastName = lastName;
  } 
  
  updateSocialLinks(links: Record<string, string>): void {
    this.socialLinks = links;
  }

  changeAvatar(url: string): void {
    this.avatarUrl = url;
  }

  changeEmail(newEmail: string): void {
    if (this.status === UserStatus.Blocked) {
      throw new Error('Blocked users cannot change email');
    }

    this.email = newEmail.toLowerCase();
  }

  changePassword(
    currentPlain: string, 
    newPlain: string
  ): void {
    const isCurrentCorrect = compareSync(currentPlain, this.passwordHash);
    if (!isCurrentCorrect) {
      throw new Error('Current password is incorrect');
    }

    this.passwordHash = hashSync(newPlain, 10);
  }

}