export class UpdateUserProfileDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
}
