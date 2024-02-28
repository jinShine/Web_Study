import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

// @Controller()
@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // @Get()
  @Query(() => String)
  getHello(): string {
    return this.boardsService.getHello();
  }

  @Query(() => String, { nullable: true })
  fetchName(): string {
    return this.boardsService.getName();
  }
}
