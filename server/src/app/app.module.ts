import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from '../gateway/chat.gateway';
import { AuthService } from '../auth/auth.service';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { CsrfMiddleware } from 'src/middleware/csrf.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*')
      .apply(AuthMiddleware, CsrfMiddleware)
      .exclude(
        { path: '/register', method: RequestMethod.POST },
        { path: '/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
