import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    try {
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Bearer token is missing');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authorization header');
    }
  }
}
