import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const csrfToken = req.headers['x-csrf-token'];
      const sessionCsrfToken = req.session['csrfToken'];

      if (!csrfToken || !sessionCsrfToken || csrfToken !== sessionCsrfToken) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Invalid CSRF token' });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid CSRF token' });
    }
  }
}
