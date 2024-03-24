import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // "/"
  getHello() {
    return 'Home Page';
  }

  @Get('/post')
  getPost() {
    return 'Post page';
  }

  @Get('/user')
  getUser() {
    return 'User Page';
  }
}
