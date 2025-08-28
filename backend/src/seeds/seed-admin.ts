import 'dotenv/config';
import { UserOrmEntity } from '../users/infrastructure/entities/user.orm-entity';
import { UserStatus } from '../users/domain/user-status.enum';
import { UserRole } from '../users/domain/user-role.enum';
import { hashSync } from 'bcrypt';
import dataSource from '../data-source';

async function seedAdmin() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(UserOrmEntity);

  const existing = await userRepo.findOneBy({ email: process.env.ADMIN_EMAIL! });
  if (existing) {
    process.exit(0);
  }

  const admin = userRepo.create({
    id: crypto.randomUUID(),
    email: process.env.ADMIN_EMAIL!,
    passwordHash: hashSync(process.env.ADMIN_PASSWORD!, 10),
    firstName: 'Darja',
    lastName: 'Suhhanova',
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D35AQElIDhYK6v8Hw/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1713545163241?e=1756900800&v=beta&t=9kQwxkOFufYTbEaXXPeMqA8pVz04IOUKjLGXlv2i-6o',
    socialLinks: { 'LinkedIn' : 'https://www.linkedin.com/in/darja-suhhanova/' },
    status: UserStatus.Active,
    role: UserRole.Admin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await userRepo.save(admin);

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
