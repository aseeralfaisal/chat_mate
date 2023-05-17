import jwt from 'jsonwebtoken';

export class AuthService {
  static generateAccessToken(username: string): string {
    return jwt.sign(username, process.env.ACCESS_TOKEN, {
      expiresIn: '1d',
    });
  }

  static generateRefreshToken(username: string): string {
    return jwt.sign(username, process.env.REFRESH_TOKEN, {
      expiresIn: '30m',
    });
  }
}
