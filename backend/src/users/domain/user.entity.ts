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
    if (!firstName.trim() || !lastName.trim()) {
      throw new Error('Name fields must not be empty');
    }
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
    if (!newEmail.trim()) {
      throw new Error('Email must not be empty');
    }

    if (!newEmail.includes('@') || !newEmail.includes('.')) {
      throw new Error('Invalid email format');
    }

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

    if (newPlain.length < 8) {
      throw new Error('New password must be at least 8 characters');
    }

    this.passwordHash = hashSync(newPlain, 10);
  }

}