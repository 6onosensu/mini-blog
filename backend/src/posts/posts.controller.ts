import { Controller, Get, Post as HttpPost, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @HttpPost()
  create(@Body() data: Partial<PostEntity>) {
    return this.postsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<PostEntity>) {
    return this.postsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
