import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly accessToken: string;
  private readonly refreshToken: string;
  private readonly jwtService: JwtService;

  constructor() {
    this.accessToken = process.env.ACCESS_TOKEN;
    this.refreshToken = process.env.REFRESH_TOKEN;
    this.jwtService = new JwtService({
      privateKey: this.accessToken,
    });
  }

  generateAccessToken(username: string) {
    return this.jwtService.sign({ username }, { expiresIn: '1d' });
  }

  generateRefreshToken(username: string) {
    const refreshTokenService = new JwtService({
      privateKey: this.refreshToken,
    });
    return refreshTokenService.sign({ username }, { expiresIn: '30m' });
  }
}
