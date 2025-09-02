import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../domain/user-role.enum';
import { UserStatus } from '../../domain/user-status.enum';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'jsonb', default: {} })
  socialLinks: Record<string, string>;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Guest })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Pending })
  status: UserStatus;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
  
  @Column({ name: 'reset_token_hash', type: 'varchar', length: 128, nullable: true })
  resetTokenHash: string | null;

  @Column({ name: 'reset_token_expires', type: 'timestamptz', nullable: true })
  resetTokenExpires: Date | null;
}
