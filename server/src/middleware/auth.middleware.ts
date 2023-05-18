import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies?.access_token;
      if (!accessToken) {
        return res.sendStatus(403);
      }

      const auth = new AuthService();
      const verification = await auth.verifyToken(accessToken);
      if (!verification) {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) {
          return res.sendStatus(401);
        }

        const refreshedTokens = await auth.refreshAccessToken(refreshToken);
        if (!refreshedTokens) {
          return res.sendStatus(401);
        }

        res.cookie('access_token', refreshedTokens.accessToken);
        res.cookie('refresh_token', refreshedTokens.refreshToken);
      }

      next();
    } catch (error) {
      console.log(error);
    }
  }
}
