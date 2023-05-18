import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class authMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies?.access_token;
    console.log('MIDDLEWARE COOKIE', cookie);
    if (!cookie) res.sendStatus(403);

    const verification = await AuthService.verifyToken(cookie);
    if (!verification) res.sendStatus(401);

    next();
  }
}
