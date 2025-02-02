import { Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  /// authorization: Basic $token
  // 들어 온다.
  // 즉 token은 "Basic $token" 형태다.
  // token은 base64 인코딩 되어 있기 때문에 따라서 디코딩 해야 한다.
  // 디코딩을 하면 :의 왼쪽은 이메일, 오른쪽은 비밀번호다.
  registerUser(@Headers('authorization') token: string) {
    return this.authService.register(token);
  }
}
