import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    return {
      accessToken: 'jwt_token_placeholder',
      refreshToken: 'refresh_token_placeholder',
      expiresIn: 3600,
    };
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    return {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      createdAt: new Date(),
    };
  }

  validateToken(token: string) {
    return { valid: true, decoded: {} };
  }

  refreshToken(refreshToken: string) {
    return {
      accessToken: 'new_jwt_token_placeholder',
      expiresIn: 3600,
    };
  }

  logout(userId: string) {
    return { success: true, message: 'User logged out successfully' };
  }
}
