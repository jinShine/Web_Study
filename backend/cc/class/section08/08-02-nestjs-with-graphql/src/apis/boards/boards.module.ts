import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  imports: [],
  // controllers는 사용하지 않아서 제거
  providers: [
    BoardsResolver, //
    BoardsService,
  ], // Resolver는 컨트롤러가 아니기 떄문에 providers에 주입
})
export class BoardsModule {}
