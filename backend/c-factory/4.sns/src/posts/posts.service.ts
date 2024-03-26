import { Injectable, NotFoundException } from '@nestjs/common';
/**
 * POST BODY 구현해보기
 *
 * author: string
 * content: string
 * title: string
 * likeCount: number
 * commentCount: number
 */

export interface PostModel {
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

@Injectable()
export class PostsService {
  getAllPost() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
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

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === postId);

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
      if (prevPost.id === postId) {
        return post;
      }

      return prevPost;
    });

    return post;
  }

  deletePost(postId: number) {
    posts = posts.filter((post) => post.id !== postId);

    if (!posts) {
      throw new NotFoundException();
    }

    return postId;
  }
}
