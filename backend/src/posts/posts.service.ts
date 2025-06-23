import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

   findAll() {
    return this.postRepo.find();
  }

  findOne(id: number) {
    return this.postRepo.findOneBy({ id });
  }

  async create(data: Partial<Post>) {
    const post = this.postRepo.create(data);
    return this.postRepo.save(post);
  }

  async update(id: number, data: Partial<Post>) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');
    Object.assign(post, data);
    return this.postRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');
    return this.postRepo.remove(post);
  }
}
