import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly accessTokenSecret: string = process.env.ACCESS_TOKEN;
  private readonly refreshTokenSecret: string = process.env.REFRESH_TOKEN;

  private readonly accessTokenService: JwtService;
  private readonly refreshTokenService: JwtService;

  constructor() {
    this.accessTokenService = new JwtService({
      secret: this.accessTokenSecret,
    });

    this.refreshTokenService = new JwtService({
      secret: this.refreshTokenSecret,
    });
  }

  generateAccessToken(username: string) {
    return this.accessTokenService.sign({ username }, { expiresIn: '10s' });
  }

  generateRefreshToken(username: string) {
    return this.refreshTokenService.sign({ username }, { expiresIn: '30m' });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decodedRefreshToken = await this.refreshTokenService.verify(
        refreshToken,
      );
      const { username } = decodedRefreshToken;
      const accessToken = this.generateAccessToken(username);
      const newRefreshToken = this.generateRefreshToken(username);
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyToken(accessToken: string) {
    try {
      return await this.accessTokenService.verify(accessToken);
    } catch (error) {
      console.log(error);
    }
  }
}
