import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private static readonly accessToken: string = process.env.ACCESS_TOKEN || 'default_access_token';
  private static readonly refreshToken: string = process.env.REFRESH_TOKEN || 'default_refresh_token';
  private static readonly jwtService: JwtService = new JwtService({
    privateKey: AuthService.accessToken,
  });

  static generateAccessToken(username: string): string {
    return AuthService.jwtService.sign({ username }, { expiresIn: '1d' });
  }

  static generateRefreshToken(username: string): string {
    const refreshTokenService = new JwtService({
      privateKey: AuthService.refreshToken,
    });
    return refreshTokenService.sign({ username }, { expiresIn: '30m' });
  }

  static verifyToken(token: string): any {
    return AuthService.jwtService.verify(token);
  }
}
