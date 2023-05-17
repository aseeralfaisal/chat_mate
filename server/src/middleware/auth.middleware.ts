import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class authMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies?.access_token;
    if (!cookie) return HttpStatus.FORBIDDEN;

    const verification = await AuthService.verifyToken(cookie);
    if (!verification) return HttpStatus.UNAUTHORIZED;

    next();
  }
}
