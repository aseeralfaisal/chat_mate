import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private static readonly accessToken: string = process.env.ACCESS_TOKEN;
  private static readonly refreshToken: string = process.env.REFRESH_TOKEN;
  private static readonly jwtService: JwtService = new JwtService({
    secret: AuthService.accessToken,
  });

  static generateAccessToken(username: string): string {
    return AuthService.jwtService.sign({ username }, { expiresIn: '15s' });
  }

  static generateRefreshToken(username: string): string {
    const refreshTokenService = new JwtService({
      privateKey: AuthService.refreshToken,
    });
    return refreshTokenService.sign({ username }, { expiresIn: '30m' });
  }

  static async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('Expired Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
