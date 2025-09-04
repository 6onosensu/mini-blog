import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository.interface';
import { User } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { UserOrmEntity } from './entities/user.orm-entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersRepositoryTypeOrm implements UsersRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async save(user: User): Promise<void> {
    const ormEntity = UserMapper.fromDomain(user);
    await this.repo.save(ormEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async saveResetToken(
    userId: string, 
    tokenHash: string, 
    expiresAt: Date
  ): Promise<void> {
    await this.repo.update(
      { id: userId },
      { resetTokenHash: tokenHash, resetTokenExpires: expiresAt },
    );
  }

  async findByResetTokenHash(tokenHash: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { resetTokenHash: tokenHash }
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async clearResetToken(userId: string): Promise<void> {
    await this.repo.update(
      { id: userId }, 
      { resetTokenHash: null, resetTokenExpires: null }
    );
  }
}
