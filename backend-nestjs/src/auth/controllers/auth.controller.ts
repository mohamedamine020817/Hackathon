import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }

  @Post('register')
  register(
    @Body()
    registerData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ) {
    return this.authService.register(
      registerData.email,
      registerData.password,
      registerData.firstName,
      registerData.lastName,
    );
  }

  @Post('refresh')
  refresh(@Body() data: { refreshToken: string }) {
    return this.authService.refreshToken(data.refreshToken);
  }

  @Post('logout/:userId')
  logout(@Param('userId') userId: string) {
    return this.authService.logout(userId);
  }

  @Get('validate/:token')
  validateToken(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }
}
