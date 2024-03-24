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
import { PostsService } from './posts.service';

/**
 * POST BODY 구현해보기
 *
 * author: string
 * content: string
 * title: string
 * likeCount: number
 * commentCount: number
 */

interface PostModel {
  id: number;
  author: string;
  content: string;
  title: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'buzz',
    content: '토이스토리1 존잼',
    title: '토이스토리1',
    likeCount: 10,
    commentCount: 10,
  },
  {
    id: 2,
    author: 'zzang1',
    content: '토이스토리2 존잼',
    title: '토이스토리2',
    likeCount: 10,
    commentCount: 10,
  },
  {
    id: 3,
    author: 'zz3',
    content: '토이스토리3 존잼',
    title: '토이스토리3',
    likeCount: 10,
    commentCount: 10,
  },
];

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
    return posts;
  }

  // 2. GET /posts/:id
  //  * id에 해당되는 post를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3. POST /posts
  //  * post를 생성한다.
  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      content,
      title,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
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
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => {
      if (prevPost.id === +id) {
        return post;
      }

      return prevPost;
    });

    return post;
  }

  // 5. DELETE /posts/:id
  // * id에 해당되는 post를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    posts = posts.filter((post) => post.id !== +id);

    if (!posts) {
      throw new NotFoundException();
    }

    return id;
  }
}
