import { User } from "src/users/domain/user.entity";
import { UserOrmEntity } from "../entities/user.orm-entity";

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.passwordHash,
      entity.firstName,
      entity.lastName,
      entity.avatarUrl ?? null,
      entity.socialLinks ?? {},
      entity.role,
      entity.status,
      entity.createdAt,
      entity.updatedAt,  
      entity.resetTokenHash ?? null,
      entity.resetTokenExpires ?? null,
    );
  }

  static fromDomain(user: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = user.id;
    orm.email = user.email;
    orm.passwordHash = user.passwordHash;
    orm.firstName = user.firstName;
    orm.lastName = user.lastName;
    orm.avatarUrl = user.avatarUrl ?? '';
    orm.socialLinks = user.socialLinks ?? {};
    orm.role = user.role;
    orm.status = user.status;
    orm.createdAt = user.createdAt;
    orm.updatedAt = user.updatedAt;
    orm.resetTokenHash = user.resetTokenHash ?? null;
    orm.resetTokenExpires = user.resetTokenExpires ?? null;
    return orm;
  }
}