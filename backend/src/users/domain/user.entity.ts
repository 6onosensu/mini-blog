import { CreateUserDto } from "../presentation/dto/create-user.dto";
import { UserRole } from "./user-role.enum";
import { UserStatus } from "./user-status.enum";
import { compareSync, hashSync } from 'bcrypt';
import { v4 } from 'uuid';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public firstName: string,
    public lastName: string,
    public avatarUrl: string | null,
    public socialLinks: Record<string, string>,
    public role: UserRole,
    public status: UserStatus = UserStatus.Pending,
    public createdAt: Date,
    public updatedAt: Date,
    public resetTokenHash: string | null,
    public resetTokenExpires: Date | null,
  ) {}

  get isActive() { return this.status === UserStatus.Active; }
  get isPending() { return this.status === UserStatus.Pending; }
  get isBlocked() { return this.status === UserStatus.Blocked; }

  activate() { 
    if (!this.isPending) throw new Error("Only pending users can be activated!")
    this.status = UserStatus.Active;
    return this;
  }
  
  block() { 
    this.status = UserStatus.Blocked; 
    return this;
  }

  changeName(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  } 
  
  updateSocialLinks(links: Record<string, string>) {
    this.socialLinks = links;
    return this;
  }

  changeAvatar(url: string | null) {
    this.avatarUrl = url;
    return this;
  }

  changeEmail(newEmail: string) {
    if (this.isBlocked) throw new Error('Blocked users cannot change email');
    this.email = newEmail.toLowerCase();
    return this;
  }

  changePassword(currentPlain: string, newPlain: string) {
    const ok = compareSync(currentPlain, this.passwordHash);
    if (!ok) throw new Error('Current password is incorrect');
    this.passwordHash = hashSync(newPlain, 10);
    return this;
  }

   static register(dto: CreateUserDto, hashedPassword: string): User {
    return new User(
      v4(),
      dto.email.toLowerCase(),
      hashedPassword,
      dto.firstName,
      dto.lastName,
      dto.avatarUrl ?? null,
      dto.socialLinks ?? {},
      UserRole.Guest,
      UserStatus.Pending,
      new Date(),
      new Date(),
      null,
      null,
    );
  }
}