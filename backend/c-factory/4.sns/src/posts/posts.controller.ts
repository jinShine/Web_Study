import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostModel, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 1. GET /posts
   * 모든 post를 가져온다.
   *
   * 2. GET /posts/:id
   * id에 해당되는 post를 가져온다.
   *
   * 3. POST /posts
   * post를 생성한다.
   *
   * 4. PATCH /posts/:id
   * id에 해당하는 post를 변경한다.
   *
   * 5. DELETE /posts/:id
   * id에 해당되는 post를 삭제한다.
   */

  // 1. GET /posts
  //  * 모든 post를 가져온다.
  @Get()
  getPosts(): PostModel[] {
    return this.postsService.getAllPost();
  }

  // 2. GET /posts/:id
  //  * id에 해당되는 post를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return this.postsService.getPostById(+id);
  }

  // 3. POST /posts
  //  * post를 생성한다.
  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  // 4. PATCH /posts/:id
  // * id에 해당하는 post를 변경한다.
  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    this.postsService.updatePost(+id, author, title, content);
  }

  // 5. DELETE /posts/:id
  // * id에 해당되는 post를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    this.postsService.deletePost(+id);
  }
}
