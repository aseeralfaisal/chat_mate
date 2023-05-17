import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class authMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies?.access_token;
    if (!cookie)
      throw new HttpException("cookie doesn't exist", HttpStatus.FORBIDDEN);
    const verification = await AuthService.verifyToken(cookie);
    if (!verification)
      throw new HttpException('Not Verified', HttpStatus.UNAUTHORIZED);
    next();
  }
}
