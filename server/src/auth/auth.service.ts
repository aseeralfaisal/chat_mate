import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private static readonly accessToken = process.env.ACCESS_TOKEN;
  private static readonly refreshToken = process.env.REFRESH_TOKEN;
  private static readonly jwtService = new JwtService({
    privateKey: AuthService.accessToken,
  });

  static generateAccessToken(username: string) {
    return this.jwtService.sign({ username }, { expiresIn: '1d' });
  }

  static generateRefreshToken(username: string) {
    const refreshTokenService = new JwtService({
      privateKey: AuthService.refreshToken,
    });
    return refreshTokenService.sign({ username }, { expiresIn: '30m' });
  }
}
