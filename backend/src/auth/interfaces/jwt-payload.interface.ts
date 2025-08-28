import { UserRole } from 'src/users/domain/user-role.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
