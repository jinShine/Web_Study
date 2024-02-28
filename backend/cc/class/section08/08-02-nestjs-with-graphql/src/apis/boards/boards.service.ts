import { Injectable, Scope } from '@nestjs/common';

// Detaulf -> 싱글톤(new 한번)
// Request -> 요청이 올때마다 new를 계속
// Transient -> 매 주입마다 new 계속
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  getHello(): string {
    return 'Hello World!';
  }

  getName(): string {
    return 'Buzz';
  }
}
